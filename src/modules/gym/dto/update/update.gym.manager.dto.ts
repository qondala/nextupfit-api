import { PartialType } from '@nestjs/swagger';

import { CreateGymManagerDto } from '../create';

export class UpdateGymManagerDto extends PartialType(CreateGymManagerDto) {}
