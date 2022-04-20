import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { HttpModule } from '@nestjs/axios';
import { LoggedUser } from './logged-users';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  constructor() {
    LoggedUser.EXPIRATION_TIME = 1 * 60 * 60;
  }
}
