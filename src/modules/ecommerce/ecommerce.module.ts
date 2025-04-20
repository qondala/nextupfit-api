import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcommerceCartItem } from './entity/ecommerce.cart-item.entity';
import { EcommerceCartItemController } from './controller/ecommerce.cart-item.controller';
import { EcommerceCartItemService } from './service/ecommerce.cart-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([EcommerceCartItem])],
  controllers: [EcommerceCartItemController],
  providers: [EcommerceCartItemService],
  exports: [EcommerceCartItemService],
})
export class EcommerceModule {}
