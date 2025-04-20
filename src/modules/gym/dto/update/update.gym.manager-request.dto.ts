import { PartialType } from '@nestjs/swagger';

import { CreateGymManagerRequestDto } from '../create';

export class UpdateGymManagerRequestDto extends PartialType(CreateGymManagerRequestDto) {}
