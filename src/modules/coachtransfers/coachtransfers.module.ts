import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { CoachTransfersController } from "./coachtransfers.controller";
import { CoachTransfersService } from "./coachtransfers.service";
import { Coach } from "src/entities/coach.entity";
import { CoachTransfer } from "src/entities/coach-transfer.entity";
import { StripeModule } from "../payments/payments.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([CoachTransfer, Coach, User]),
    StripeModule.forRoot(),
  ],
  providers: [CoachTransfersService],
  controllers: [CoachTransfersController],
})
export class CoachTransfersModule {}
