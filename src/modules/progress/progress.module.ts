import { Module } from "@nestjs/common";
import { ProgressService } from "./progress.service";
import { ProgressController } from "./progress.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exercise } from "../../entities/exercise.entity";
import { User } from "../../entities/user.entity";
import { Progress } from "../../entities/progress.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Progress, User, Exercise])],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {}
