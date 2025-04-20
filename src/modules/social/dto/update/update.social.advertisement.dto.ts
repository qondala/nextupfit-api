import { PartialType } from '@nestjs/swagger';
import { CreateSocialAdvertisementDto } from '../create';

export class UpdateSocialAdvertisementDto extends PartialType(CreateSocialAdvertisementDto) {}
