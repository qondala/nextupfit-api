import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../constants/roles";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "src/database/data-source";

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
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

    const userRepository = AppDataSource.getRepository(User);
    const fetchedUser = await userRepository.findOne({
      where: { id: user.id },
      relations: ["coach", "coach.admin"],
    });

    if (!fetchedUser) {
      throw new UnauthorizedException("User not found");
    }

    const userRole = fetchedUser.coach?.admin
      ? "admin"
      : fetchedUser.coach
        ? "coach"
        : "user";

    if (!requiredRoles.includes(userRole)) {
      throw new UnauthorizedException("Unauthorized");
    }
    return true;
  }
}
