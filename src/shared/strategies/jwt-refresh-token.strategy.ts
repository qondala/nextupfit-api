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
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_REFRESH_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(
    req: AppRequest,
    payload: any,
  ): Promise<DetailsUserDto | null> {
    console.log("refresh otken sub: ", payload.sub);
    console.log("refresh otken meme: ", req.body.refreshToken);
    console.log("Here we validate the refresh token", {payload, req});

    const refreshToken = req.body.refreshToken;
    const user = await this.userService.findOne(payload.sub);

    console.log("Refresh token user: ", user);

    if (!user || !user.refreshToken) return null;


    return user;
  }
}
