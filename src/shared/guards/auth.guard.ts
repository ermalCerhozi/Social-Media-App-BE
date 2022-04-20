import { CanActivate, ExecutionContext } from "@nestjs/common";
import { LoggedUser } from "../../user/logged-users";
import { Request } from "express";

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    if (
      request &&
      request.headers &&
      request.headers.authorization &&
      request.headers.authorization !== ''
    ) {
      const token: string = request.headers.authorization;
      return !!LoggedUser.verifyUser(token);
    }
  }
}
