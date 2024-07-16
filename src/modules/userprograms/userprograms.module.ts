import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "../../entities/content.entity";
import { PerformanceRecord } from "../../entities/performance-record.entity";
import { UserProgram } from "../../entities/user-program.entity";
import { User } from "../../entities/user.entity";
import { UserProgramsService } from "./userprogram.service";
import { UserProgramsController } from "./userprograms.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProgram, User, Content, PerformanceRecord]),
  ],
  controllers: [UserProgramsController],
  providers: [UserProgramsService],
  exports: [UserProgramsService],
})
export class UserProgramsModule {}
