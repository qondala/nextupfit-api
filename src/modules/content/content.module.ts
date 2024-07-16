import { Module } from "@nestjs/common";
import { ContentService } from "./content.service";
import { ContentController } from "./content.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliateProgram } from "../../entities/affiliate-program.entity";
import { Category } from "../../entities/category.entity";
import { Challenge } from "../../entities/challenge.entity";
import { Coach } from "../../entities/coach.entity";
import { ContentGoal } from "../../entities/content-goal.entity";
import { Content } from "../../entities/content.entity";
import { Exercise } from "../../entities/exercise.entity";
import { Stage } from "../../entities/stage.entity";
import { TrainingContentLink } from "../../entities/training-content-link.entity";
import { Session } from "../../entities/session.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Content,
      Coach,
      Category,
      ContentGoal,
      Exercise,
      Stage,
      Challenge,
      Session,
      TrainingContentLink,
      AffiliateProgram,
    ]),
  ],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
