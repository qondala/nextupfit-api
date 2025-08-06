import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GymEntity, GymManagerEntity } from "@app/module/gym/entity";
import { UserEntity } from "@app/module/user/entity";

import { MapEntity } from "./entity";
import { MapController } from "./controller";
import { MapService } from "./service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MapEntity,

      // External dependencies
      GymEntity,
      GymManagerEntity,
      UserEntity,
    ]),
  ],
  controllers: [MapController],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
