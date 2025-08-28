import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  PaymentEntity,
  PaymentTransferEntity,
  PaymentCartEntity,
  PaymentCartItemEntity,
  PaymentItemEntity,
  PaymentCreditCardEntity,
} from "./entity";
import {
  PaymentController,
  PaymentTransferController,
  PaymentCartController,
  PaymentCartItemController,
  PaymentItemController,
  PaymentCreditCardController,
} from "./controller";
import {
  PaymentService,
  PaymentTransferService,
  PaymentCartService,
  PaymentCartItemService,
  PaymentItemService,
  PaymentCreditCardService,
} from "./service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      PaymentTransferEntity,
      PaymentCartEntity,
      PaymentCartItemEntity,
      PaymentItemEntity,
      PaymentCreditCardEntity,
    ]),
  ],
  controllers: [
    PaymentController,
    PaymentTransferController,
    PaymentCartController,
    PaymentCartItemController,
    PaymentItemController,
    PaymentCreditCardController,
  ],
  providers: [
    PaymentService,
    PaymentTransferService,
    PaymentCartService,
    PaymentCartItemService,
    PaymentItemService,
    PaymentCreditCardService,
  ],
  exports: [
    PaymentService,
    PaymentTransferService,
    PaymentCartService,
    PaymentCartItemService,
    PaymentItemService,
    PaymentCreditCardService,
  ],
})
export class PaymentModule {}
