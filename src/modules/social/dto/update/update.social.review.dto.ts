import { PartialType } from '@nestjs/swagger';
import { CreateSocialReviewDto } from '../create';

export class UpdateSocialReviewDto extends PartialType(CreateSocialReviewDto) {}
