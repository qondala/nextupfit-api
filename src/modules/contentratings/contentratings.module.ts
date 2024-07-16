import { Module } from "@nestjs/common";
import { ContentRatingsService } from "./contentratings.service";
import { ContentRatingsController } from "./contentratings.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentRating } from "../../entities/content-rating.entity";
import { Content } from "../../entities/content.entity";
import { User } from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ContentRating, User, Content])],
  controllers: [ContentRatingsController],
  providers: [ContentRatingsService],
  exports: [ContentRatingsService],
})
export class ContentRatingsModule {}
