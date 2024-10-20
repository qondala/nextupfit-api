import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "../../entities/content.entity";
import { PerformanceRecord } from "../../entities/performance-record.entity";
import { UserChallenge } from "../../entities/user-challenge.entity";
import { User } from "../../entities/user.entity";
import { UserChallengesService } from "./userchallenges.service";
import { UserChallengesController } from "./userchallenges.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserChallenge, User, Content, PerformanceRecord]),
  ],
  controllers: [UserChallengesController],
  providers: [UserChallengesService],
  exports: [UserChallengesService],
})
export class UserChallengesModule {}
