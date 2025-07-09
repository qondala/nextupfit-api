import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  PaymentEntity,
  PaymentTransferEntity,
  PaymentCartEntity,
} from './entity';
import {
  PaymentController,
  PaymentTransferController,
  PaymentCartController,
} from './controller';
import {
  PaymentService,
  PaymentTransferService,
  PaymentCartService,
} from './service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      PaymentTransferEntity,
      PaymentCartEntity,
    ]),
  ],
  controllers: [
    PaymentController,
    PaymentTransferController,
    PaymentCartController,
  ],
  providers: [
    PaymentService,
    PaymentTransferService,
    PaymentCartService,
  ],
  exports: [
    PaymentService,
    PaymentTransferService,
    PaymentCartService,
  ],
})
export class PaymentModule {}





