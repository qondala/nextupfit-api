import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MapEntity } from './entity';
import { MapController } from './controller';
import { MapService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MapEntity
    ])
  ],
  controllers: [
    MapController
  ],
  providers: [
    MapService
  ],
  exports: [
    MapService
  ]
})
export class MapModule {}
