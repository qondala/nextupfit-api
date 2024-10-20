import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "src/entities/payment.entity";
import { User } from "src/entities/user.entity";
import { Admin } from "src/entities/admin.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Admin])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
