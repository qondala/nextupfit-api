import { Module, Session } from "@nestjs/common";
import { SessionReviewsService } from "./sessionreviews.service";
import { SessionReviewsController } from "./sessionreviews.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionReview } from "../../entities/session-review.entity";
import { User } from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SessionReview, User, Session])],
  controllers: [SessionReviewsController],
  providers: [SessionReviewsService],
  exports: [SessionReviewsService],
})
export class SessionReviewsModule {}
