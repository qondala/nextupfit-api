import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";


import { ROLES_KEY } from "../constants/roles";
import { UserEntity } from "@app/module/user/entity";
import { AppDataSource } from "../../database/data-source";
import { UserProfileTypeEnum } from "@app/module/user/types";

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<UserProfileTypeEnum[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException("User not found"); // Gérez le cas où l'utilisateur n'est pas trouvé
    }

    const userRepository = AppDataSource.getRepository(UserEntity);
    const fetchedUser = await userRepository.findOne({
      where: { id: user.id },
    });

    if (!fetchedUser) {
      throw new UnauthorizedException("User not found");
    }

    const userRoles = fetchedUser.userProfile;

    // Check if user's profile is part of authorized app roles
    const countRoles = userRoles.reduce(
      (acc, role) => acc + (requiredRoles.includes(role) ? 1 : 0), 0);


    if (countRoles == 0) {
      throw new UnauthorizedException("Unauthorized");
    }

    return true;
  }
}
