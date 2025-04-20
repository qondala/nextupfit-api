import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { DetailsGymDto } from './';
import { DetailsBaseWorkoutDto } from '@app/module/base/dto';


export class DetailsGymSpecializedInWorkoutDto {

  @ApiProperty({
    type: Number,
    description: "record id",
    required: true,
  })
  id: number;

  @ApiProperty({
    type: Number,
    description: "Gym id",
    required: true,
  })
  gymId: number;

  @ApiProperty({
    type: Number,
    description: "Workout id",
    required: true,
  })
  workoutId: number;

  @ApiProperty({
    type: Date,
    description: "Created at",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
  type: Date,
    description: "Updated at",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  updatedAt?: Date;

  @ApiProperty({
    type: () => DetailsBaseWorkoutDto,
    description: "Base workout details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsBaseWorkoutDto)
  workout: DetailsBaseWorkoutDto;


  @ApiProperty({
    type: () => DetailsGymDto,
    description: "Gym details",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsGymDto)
  gym?: DetailsGymDto
}
