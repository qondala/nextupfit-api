import { PartialType } from '@nestjs/swagger';

import { CreateGymMembershipDto } from '../create';

export class UpdateGymMembershipDto extends PartialType(CreateGymMembershipDto) {}
