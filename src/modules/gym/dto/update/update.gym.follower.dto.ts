import { PartialType } from '@nestjs/swagger';

import { CreateGymFollowerDto } from '../create';

export class UpdateGymFollowerDto extends PartialType(CreateGymFollowerDto) {}
