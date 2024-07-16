import { Module } from "@nestjs/common";
import { MailService } from "./services/mail.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coach } from "../entities/coach.entity";
import { User } from "../entities/user.entity";
import { RolesConstant } from "./constants/roles";
import { RolesGuard } from "./guards/roles.guards";
import { UsersModule } from "../modules/users/users.module";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Coach]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [
    JwtAuthGuard,
    RolesGuard,
    MailService,
    JwtStrategy,
    { provide: RolesConstant, useValue: ["user", "coach", "admin"] },
  ],
  exports: [
    JwtAuthGuard,
    RolesGuard,
    MailService,
    PassportModule,
    JwtModule,
    RolesConstant,
  ],
})
export class SharedModule {}
