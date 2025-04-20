import { PartialType } from '@nestjs/swagger';

import { CreateGymOpenDayDto } from '../create';

export class UpdateGymOpenDayDto extends PartialType(CreateGymOpenDayDto) {}
