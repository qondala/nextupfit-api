import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "../../entities/payment.entity";
import Stripe from "stripe";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

class StripeModule {
  static forRoot(): DynamicModule {
    return {
      module: StripeModule,
      providers: [
        {
          provide: Stripe,
          useFactory: () => new Stripe(process.env.STRIPE_SECRET_KEY),
        },
      ],
      exports: [Stripe],
    };
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), StripeModule.forRoot()],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
