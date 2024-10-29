import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashbord.service";
import { Coach } from "src/entities/coach.entity";
import { Content } from "src/entities/content.entity";
import { User } from "src/entities/user.entity";
import { Admin } from "src/entities/admin.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Coach, User, Content, Admin])],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
