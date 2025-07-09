import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "@app/module/user/service";
import { DetailsUserDto } from "@app/module/user/dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<DetailsUserDto> {
    const user = await this.userService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException("Invalid token");
    }
    return user;
  }
}
