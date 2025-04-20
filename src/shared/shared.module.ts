import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { MailService } from "@app/common/service";
import { RolesConstant, UserRole } from "@app/common/constants";
import { RolesGuard, JwtAuthGuard } from "@app/common/guards";
import { JwtStrategy } from "@app/common/strategies";

import { UserModule } from "@app/module/user/user.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    UserModule,
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
    {
      provide: RolesConstant,
      useValue: [
        UserRole.attendee,
        UserRole.coach,
        UserRole.nutritionist,
        UserRole.instructor,
        UserRole.owner,
      ] 
    },
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
