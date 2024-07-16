import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtRefreshTokenStrategy } from "../../shared/strategies/jwt-refresh-token.strategy";
import { JwtStrategy } from "../../shared/strategies/jwt.strategy";
import { LocalStrategy } from "../../shared/strategies/local.strategy";
import { SharedModule } from "../../shared/shared.module";
import { PublicGuard } from "../../shared/guards/public.guard";
import { UsersModule } from "../users/users.module";
import { FirebaseAuthService } from "./firebaseauth.service";

@Module({
  imports: [
    PassportModule,
    SharedModule, // Import du SharedModule
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: "1d", // Durée de vie du token d'accès
        },
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_REFRESH_SECRET"),
        signOptions: {
          expiresIn: "7d", // Durée de vie du token de rafraîchissement
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    PublicGuard,
    FirebaseAuthService
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
