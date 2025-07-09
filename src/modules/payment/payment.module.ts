import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  PaymentEntity,
  PaymentTransferEntity,
  PaymentCartEntity,
  PaymentCartItemEntity,
} from './entity';
import {
  PaymentController,
  PaymentTransferController,
  PaymentCartController,
  PaymentCartItemController
} from './controller';
import {
  PaymentService,
  PaymentTransferService,
  PaymentCartService,
  PaymentCartItemService,
} from './service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      PaymentTransferEntity,
      PaymentCartEntity,
      PaymentCartItemEntity,
    ]),
  ],
  controllers: [
    PaymentController,
    PaymentTransferController,
    PaymentCartController,
    PaymentCartItemController,
  ],
  providers: [
    PaymentService,
    PaymentTransferService,
    PaymentCartService,
    PaymentCartItemService,
  ],
  exports: [
    PaymentService,
    PaymentTransferService,
    PaymentCartService,
    PaymentCartItemService,
  ],
})
export class PaymentModule {}





