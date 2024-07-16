import { Module, Session } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "../../entities/content.entity";
import { TrainingContentLink } from "../../entities/training-content-link.entity";
import { TrainingContentLinksController } from "./trainingcontentlinks.controller";
import { TrainingContentLinksService } from "./trainingcontentlinks.service";

@Module({
  imports: [TypeOrmModule.forFeature([TrainingContentLink, Session, Content])],
  controllers: [TrainingContentLinksController],
  providers: [TrainingContentLinksService],
  exports: [TrainingContentLinksService],
})
export class TrainingContentLinksModule {}
