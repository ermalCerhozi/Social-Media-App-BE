import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { environment } from '../environment/environment';
import { UserEntity } from './user.entity';
import { LoggedUser } from './logged-users';
import { UserDto } from './dto/user.dto';
import { UserRole } from '../shared/enums/user-role.enum';

@Injectable()
export class UserService {
  private oAuth2Client: OAuth2Client;

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    this.oAuth2Client = new OAuth2Client({
      clientId: environment.google.clientId,
      clientSecret: environment.google.secret,
    });
  }

  private async getGoogleUser(idToken: string): Promise<TokenPayload> {
    let loginTicket: LoginTicket;

    try {
      loginTicket = await this.oAuth2Client.verifyIdToken({ idToken });
      return loginTicket.getPayload();
    } catch (ex) {
      throw new UnauthorizedException(ex);
    }
  }

  async googleSignIn(idToken: string): Promise<UserDto> {
    const { email } = await this.getGoogleUser(idToken);
    return await this.signIn(email);
  }

  async googleSignUp(idToken: string): Promise<UserDto> {
    const { given_name, family_name, email } = await this.getGoogleUser(
      idToken,
    );
    return await this.signUp(given_name, family_name, email);
  }

  async signIn(email: string, password?: string): Promise<UserDto> {
    let userFound: UserEntity;

    try {
      userFound = await this.userRepository.findOne({ email });
    } catch (ex) {
      throw new NotFoundException(ex);
    }

    if (password) {
      try {
        await userFound.validatePassword(password);
      } catch (ex) {
        throw new BadRequestException(ex);
      }
    }

    const { id, firstName, lastName, role } = userFound;

    return LoggedUser.setUser({
      id,
      firstName,
      lastName,
      email,
      role,
    });
  }

  async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
  ): Promise<UserDto> {
    const newUser: UserEntity = new UserEntity(
      firstName,
      lastName,
      email,
      UserRole.USER,
    );

    if (password) {
      await newUser.setPassword(password);
    }

    try {
      await newUser.save();
    } catch (ex) {
      throw new ConflictException(ex);
    }

    const { id, role } = newUser;

    return LoggedUser.setUser({
      id,
      firstName,
      lastName,
      email,
      role,
    });
  }
}
