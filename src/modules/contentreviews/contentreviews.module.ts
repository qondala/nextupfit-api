import { Module } from "@nestjs/common";
import { ContentReviewsService } from "./contentreviews.service";
import { ContentReviewsController } from "./contentreviews.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentReview } from "../../entities/content-review.entity";
import { Content } from "../../entities/content.entity";
import { User } from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ContentReview, User, Content])],
  controllers: [ContentReviewsController],
  providers: [ContentReviewsService],
  exports: [ContentReviewsService],
})
export class ContentReviewsModule {}
