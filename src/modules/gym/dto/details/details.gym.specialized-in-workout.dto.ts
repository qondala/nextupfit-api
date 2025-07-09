import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { DetailsGymDto } from './';
import { DetailsBaseWorkoutDto } from '@app/module/base/dto';
import { SwaggerType } from "@app/common/types";


export class DetailsGymSpecializedInWorkoutDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    required: true,
  })
  @IsInt()
  gymId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workout id",
    required: true,
  })
  @IsInt()
  workoutId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Created at",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  createdAt?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Updated at",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date;

  @ApiProperty({
    type: () => DetailsBaseWorkoutDto,
    title: "DetailsBaseWorkoutDto",
    description: "Base workout details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsBaseWorkoutDto)
  workout: DetailsBaseWorkoutDto;


  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: "Gym details",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsGymDto)
  gym?: DetailsGymDto
}
