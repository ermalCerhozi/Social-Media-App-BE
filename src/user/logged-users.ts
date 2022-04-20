import { UserDto } from './dto/user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { environment } from '../environment/environment';

import * as jwt from 'jsonwebtoken';

export class LoggedUser {
  static EXPIRATION_TIME: number = 1 * 60 * 60; // 1h
  private static INVALID_TOKENS: string[] = [];

  static setUser(user: UserDto): UserDto {
    const { id, firstName, lastName, email, role } = user;
    const payload: UserDto = {
      id,
      firstName,
      lastName,
      email,
      role,
    };

    const token: string = jwt.sign(payload, environment.jwt.secret, {
      algorithm: environment.jwt.algorithm,
      expiresIn: LoggedUser.EXPIRATION_TIME,
    });

    return {
      ...payload,
      token,
    };
  }

  static getUser(token: string): UserDto {
    let user: UserDto;

    try {
      user = jwt.verify(token, environment.jwt.secret);
    } catch (ex) {
      throw ex;
    }

    return {
      ...user,
      token,
    };
  }

  static verifyUser(token: string): UserDto {
    if (this.INVALID_TOKENS.includes(token)) throw new UnauthorizedException();

    try {
      return this.getUser(token);
    } catch (ex) {
      throw new UnauthorizedException(ex);
    }
  }

  static revokeUser(token: string): void {
    this.INVALID_TOKENS.push(token);
  }
}
