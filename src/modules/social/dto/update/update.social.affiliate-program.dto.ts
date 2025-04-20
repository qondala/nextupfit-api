import { PartialType } from '@nestjs/swagger';
import { CreateSocialAffiliateProgramDto } from '../create';

export class UpdateSocialAffiliateProgramDto extends PartialType(CreateSocialAffiliateProgramDto) {}
