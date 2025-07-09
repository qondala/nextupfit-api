import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UserService } from "@app/module/user/service";
import { DetailsUserDto } from "@app/module/user/dto";
import { AppRequest } from "@app/common/types";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh-token",
) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_REFRESH_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(req: AppRequest, payload: any): Promise<DetailsUserDto | null> {
    const refreshToken = req.body.refreshToken;
    const user = await this.userService.findOne(payload.userId);

    if (!user) {
      return null;
    }

    return user;
  }
}

