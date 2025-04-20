import { PartialType } from '@nestjs/swagger';

import { CreateGymManagerOverviewDto } from '../create';

export class UpdateGymManagerOverviewDto extends PartialType(CreateGymManagerOverviewDto) {}
