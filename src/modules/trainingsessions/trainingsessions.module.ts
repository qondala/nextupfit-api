import { Module, Session } from "@nestjs/common";
import { TrainingSessionsService } from "./trainingsessions.service";
import { TrainingSessionsController } from "./trainingsessions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrainingSession } from "../../entities/training-session.entity";
import { User } from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TrainingSession, User, Session])],
  controllers: [TrainingSessionsController],
  providers: [TrainingSessionsService],
  exports: [TrainingSessionsService],
})
export class TrainingSessionsModule {}
