import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";


import { UserEntity } from "@app/module/user/entity";
import { AppDataSource } from "../../database/data-source";


@Injectable()
export class RolesGuard implements CanActivate {
 
  async canActivate(context: ExecutionContext): Promise<boolean> {

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

    if (fetchedUser.privilegeLevel < 1) {
      throw new UnauthorizedException("Unauthorized");
    }

    return true;
  }
}
