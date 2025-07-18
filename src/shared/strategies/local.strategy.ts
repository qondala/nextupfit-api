import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../../modules/auth/auth.service";
import { DetailsUserDto } from "@app/module/user/dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  async validate(email: string, password: string): Promise<DetailsUserDto | null> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return null;
    }

    return user;
  }
}
