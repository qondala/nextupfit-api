import { Module } from "@nestjs/common";
import { AdminTransfersService } from "./admintransfers.service";
import { AdminTransfersController } from "./admintransfers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "src/entities/payment.entity";
import { User } from "src/entities/user.entity";
import { Admin } from "src/entities/admin.entity";
import { StripeModule } from "../payments/payments.module";
import { AdminTransfer } from "src/entities/admin-transfer.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, User, Admin, AdminTransfer]),
    StripeModule.forRoot(),
  ],
  controllers: [AdminTransfersController],
  providers: [AdminTransfersService],
})
export class AdminModule {}
