import { PartialType } from '@nestjs/swagger';

import { CreateGymMembershipPlanFeaturesDto } from '../create';

export class UpdateGymMembershipPlanFeaturesDto extends PartialType(CreateGymMembershipPlanFeaturesDto) {}
