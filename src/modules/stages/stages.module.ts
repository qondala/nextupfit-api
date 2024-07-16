import { Module } from "@nestjs/common";
import { StagesService } from "./stages.service";
import { StagesController } from "./stages.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Content } from "../../entities/content.entity";
import { Stage } from "../../entities/stage.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Stage, Content])],
  controllers: [StagesController],
  providers: [StagesService],
  exports: [StagesService],
})
export class StagesModule {}
