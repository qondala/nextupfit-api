import { PartialType } from '@nestjs/swagger';
import { CreateSocialAffiliateLinkDto } from '../create';
export class UpdateSocialAffiliateLinkDto extends PartialType(CreateSocialAffiliateLinkDto) {}
