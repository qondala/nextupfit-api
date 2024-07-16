import { Module } from "@nestjs/common";
import { PerformanceRecordsController } from "./performancerecords.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PerformanceRecord } from "../../entities/performance-record.entity";
import { UserProgram } from "../../entities/user-program.entity";
import { PerformanceRecordsService } from "./performancerecords.servive";

@Module({
  imports: [TypeOrmModule.forFeature([PerformanceRecord, UserProgram])],
  controllers: [PerformanceRecordsController],
  providers: [PerformanceRecordsService],
  exports: [PerformanceRecordsService],
})
export class PerformanceRecordsModule {}
