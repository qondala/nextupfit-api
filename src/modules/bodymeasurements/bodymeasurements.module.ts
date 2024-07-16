import { Module } from "@nestjs/common";
import { BodyMeasurementsController } from "./bodymeasurements.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BodyMeasurement } from "../../entities/body-measurement.entity";
import { User } from "../../entities/user.entity";
import { BodyMeasurementsService } from "./bodymeasurement.service";

@Module({
  imports: [TypeOrmModule.forFeature([BodyMeasurement, User])],
  controllers: [BodyMeasurementsController],
  providers: [BodyMeasurementsService],
  exports: [BodyMeasurementsService],
})
export class BodyMeasurementsModule {}
