import {
  Injectable,
  CanActivate,
  SetMetadata,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const COACH_ROLE_KEY = "isCoach";
export const IsCoach = () => SetMetadata(COACH_ROLE_KEY, true);

@Injectable()
export class CoachGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isCoach = this.reflector.get(COACH_ROLE_KEY, context.getHandler());
    if (!isCoach) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!(user && user.coach)) {
      throw new UnauthorizedException("Unauthorized");
    }
    return true;
  }
}
