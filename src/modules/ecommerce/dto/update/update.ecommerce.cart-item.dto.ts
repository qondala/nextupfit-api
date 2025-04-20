import { PartialType } from '@nestjs/swagger';
import { CreateEcommerceCartItemDTO } from '../create/create.ecommerce.cart-item.dto';

export class UpdateEcommerceCartItemDTO extends PartialType(CreateEcommerceCartItemDTO) {}
