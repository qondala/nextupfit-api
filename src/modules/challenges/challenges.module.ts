import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Challenge } from "../../entities/challenge.entity";
import { Content } from "../../entities/content.entity";
import { ChallengesController } from "./challenges.controller";
import { ChallengesService } from "./challenges.service";
import { Session } from "src/entities/session.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, Content, Session])],
  controllers: [ChallengesController],
  providers: [ChallengesService],
  exports: [ChallengesService],
})
export class ChallengesModule {}
