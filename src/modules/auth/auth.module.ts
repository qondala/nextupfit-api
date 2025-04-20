import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import {
  JwtRefreshTokenStrategy,
  JwtStrategy,
  LocalStrategy
} from "@app/common/strategies";
import { PublicGuard } from "@app/common/guards";
import { SharedModule } from "@app/common/shared.module";

import { UserModule } from "@app/module/user/user.module";


import { FirebaseAuthService } from "./firebaseauth.service";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";


@Module({
  imports: [
    PassportModule,
    SharedModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: "1d", // Access token's lifetime
        },
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_REFRESH_SECRET"),
        signOptions: {
          expiresIn: "7d", // Refresh token's lifetime
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    PublicGuard,
    FirebaseAuthService,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
