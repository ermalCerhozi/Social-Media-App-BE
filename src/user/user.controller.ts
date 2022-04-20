import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseModel } from '../shared/models/response.model';
import { UserDto } from './dto/user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { IdTokenDto } from './dto/id-token.dto';

@ApiTags('Authentication')
@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('google/signIn')
  @HttpCode(200)
  @ApiBody({ type: IdTokenDto })
  async googleSignIn(
    @Body('idToken') idToken: string,
  ): Promise<ResponseModel<UserDto>> {
    const user: UserDto = await this.userService.googleSignIn(idToken);
    return new ResponseModel<UserDto>(user);
  }

  @Post('google/signUp')
  @ApiBody({ type: IdTokenDto })
  async googleSignUp(
    @Body('idToken') idToken: string,
  ): Promise<ResponseModel<UserDto>> {
    const user: UserDto = await this.userService.googleSignUp(idToken);
    return new ResponseModel<UserDto>(user);
  }

  @Post('signIn')
  @HttpCode(200)
  @ApiBody({ type: SignInDto })
  async signIn(@Body() signInDto: SignInDto): Promise<ResponseModel<UserDto>> {
    const { email, password } = signInDto;
    const user: UserDto = await this.userService.signIn(email, password);
    return new ResponseModel<UserDto>(user);
  }

  @Post('signUp')
  @ApiBody({ type: SignUpDto })
  async signUp(@Body() signUpDto: SignUpDto): Promise<ResponseModel<UserDto>> {
    const { firstName, lastName, email, password } = signUpDto;
    const user: UserDto = await this.userService.signUp(
      firstName,
      lastName,
      email,
      password,
    );
    return new ResponseModel<UserDto>(user);
  }
}
