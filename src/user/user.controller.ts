import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseModel } from '../shared/models/response.model';
import { UserDto } from './dto/user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiBody, ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { IdTokenDto } from './dto/id-token.dto';
import { ResponseDto } from "../shared/dtos/response.dto";
import { ApiCustomResponse } from "../shared/decorators/api-custom-response";

@ApiTags('Auth')
@Controller('auth')
@ApiExtraModels(ResponseDto, UserDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('google/signIn')
  @HttpCode(200)
  @ApiBody({ type: IdTokenDto })
  @ApiCustomResponse(UserDto)
  async googleSignIn(
    @Body('idToken') idToken: string,
  ): Promise<ResponseModel<UserDto>> {
    const user: UserDto = await this.userService.googleSignIn(idToken);
    return new ResponseModel<UserDto>(user);
  }

  @Post('google/signUp')
  @ApiBody({ type: IdTokenDto })
  @ApiCustomResponse(UserDto)
  async googleSignUp(
    @Body('idToken') idToken: string,
  ): Promise<ResponseModel<UserDto>> {
    const user: UserDto = await this.userService.googleSignUp(idToken);
    return new ResponseModel<UserDto>(user);
  }

  @Post('signIn')
  @HttpCode(200)
  @ApiBody({ type: SignInDto })
  @ApiCustomResponse(UserDto)
  async signIn(@Body() signInDto: SignInDto): Promise<ResponseModel<UserDto>> {
    const { email, password } = signInDto;
    const user: UserDto = await this.userService.signIn(email, password);
    return new ResponseModel<UserDto>(user);
  }

  @Post('signUp')
  @ApiBody({ type: SignUpDto })
  @ApiCustomResponse(UserDto)
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
