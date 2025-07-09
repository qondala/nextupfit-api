import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";

import { SharedModule } from "./shared/shared.module";
import { mailerConfig } from "./shared/service/mailer.config";

import { BaseModule } from "@app/module/base/base.module";
import { AuthModule } from "@app/module/auth/auth.module";
import { GymModule } from "@app/module/gym/gym.module";
import { UserModule } from "@app/module/user/user.module";
import { ProgramModule } from "@app/module/program/program.module";
import { SocialModule } from "@app/module/social/social.module";
import { PaymentModule } from "@app/module/payment/payment.module";
import { MapModule } from "@app/module/map/map.module";
import { ContentModule } from "@app/module/content/content.module";

@Module({
  imports: [

    // Config module
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Functional modules
    DatabaseModule,
    SharedModule,
    MailerModule.forRoot(mailerConfig),

    // Business modules
    BaseModule,
    AuthModule,
    ContentModule,
    UserModule,
    GymModule,
    ProgramModule,
    SocialModule,
    PaymentModule,
    MapModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
