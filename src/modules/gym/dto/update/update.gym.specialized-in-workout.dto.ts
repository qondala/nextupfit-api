import { PartialType } from '@nestjs/swagger';

import { CreateGymSpecializedInWorkoutDto } from '../create';

export class UpdateGymSpecializedInWorkoutDto extends PartialType(CreateGymSpecializedInWorkoutDto) {}
