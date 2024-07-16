import { Module } from "@nestjs/common";
import { PrivateDiscussionsService } from "./privatediscussions.service";
import { PrivateDiscussionsController } from "./privatediscussions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coach } from "../../entities/coach.entity";
import { PrivateDiscussion } from "../../entities/private-discussion.entity";
import { User } from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PrivateDiscussion, User, Coach])],
  controllers: [PrivateDiscussionsController],
  providers: [PrivateDiscussionsService],
  exports: [PrivateDiscussionsService],
})
export class PrivateDiscussionsModule {}
