import { PartialType } from '@nestjs/swagger';
import { CreateSocialNewsDto } from '../create';

export class UpdateSocialNewsDto extends PartialType(CreateSocialNewsDto) {}
