import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { UserRole } from "../enums/user-role.enum";
import { Request } from "express";
import { LoggedUser } from "../../user/logged-users";
import { UserDto } from "../../user/dto/user.dto";
import { Messages } from "../enums/messages.enum";

export class RoleGuard extends AuthGuard implements CanActivate {
  constructor(private role: UserRole) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const isAuthenticated: boolean = super.canActivate(context);

    if (isAuthenticated) {
      const token: string = request.headers.authorization;
      const authUser: UserDto = LoggedUser.getUser(token);

      if (authUser.role >= this.role) {
        return true;
      }

      throw new UnauthorizedException(Messages.NOT_AUTHORIZED);
    }
  }
}
