import { PartialType } from '@nestjs/swagger';

import { CreateGymManagerQualificationDto } from '../create';

export class UpdateGymManagerQualificationDto extends PartialType(CreateGymManagerQualificationDto) {}
