import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  PaymentEntity,
  PaymentTransferEntity
} from './entity';

import {
  PaymentController,
  PaymentTransferController
} from './controller';

import {
  PaymentService,
  PaymentTransferService
} from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      PaymentTransferEntity
    ])
  ],
  controllers: [
    PaymentController,
    PaymentTransferController
  ],
  providers: [
    PaymentService,
    PaymentTransferService
  ],
  exports: [
    PaymentService,
    PaymentTransferService
  ]
})
export class PaymentModule {}
