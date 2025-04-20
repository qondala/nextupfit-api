import { PartialType } from '@nestjs/swagger';
import { CreateSocialAffiliateSaleDto } from '../create';

export class UpdateSocialAffiliateSaleDto extends PartialType(CreateSocialAffiliateSaleDto) {}
