import { PartialType } from '@nestjs/swagger';

import { CreateGymManagerFollowerDto } from '../create';

export class UpdateGymManagerFollowerDto extends PartialType(CreateGymManagerFollowerDto) {}
