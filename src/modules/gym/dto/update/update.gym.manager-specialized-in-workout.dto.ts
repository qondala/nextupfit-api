import { PartialType } from '@nestjs/swagger';

import { CreateGymManagerSpecializedInWorkoutDto } from '../create';

export class UpdateGymManagerSpecializedInWorkoutDto extends PartialType(CreateGymManagerSpecializedInWorkoutDto) {}
