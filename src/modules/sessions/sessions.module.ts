import { Module, Session } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "../../entities/content.entity";
import { TrainingContentLink } from "../../entities/training-content-link.entity";
import { TrainingSession } from "../../entities/training-session.entity";
import { SessionsController } from "./sessions.controller";
import { SessionsService } from "./sessions.service";
import * as s from "../../entities/session.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      s.Session,
      Content,
      TrainingContentLink,
      TrainingSession,
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
