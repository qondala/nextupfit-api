import { PartialType } from '@nestjs/swagger';

import { CreateGymMembershipPlanDto } from '../create';

export class UpdateGymMembershipPlanDto extends PartialType(CreateGymMembershipPlanDto) {}
