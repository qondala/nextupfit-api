import { PartialType } from '@nestjs/swagger';
import { CreateSocialNotificationDto } from '../create';

export class UpdateSocialNotificationDto extends PartialType(CreateSocialNotificationDto) {}
