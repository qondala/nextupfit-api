import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, ValidateNested } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { DetailsBaseMuscleDto } from ".";
import { Type } from "class-transformer";

export class DetailsBaseWorkoutMuscleDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workout ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  workoutId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Muscle ID",
    example: 5,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  muscleId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record creation timestamp",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record last update timestamp",
    required: true,
  })
  updatedAt: Date;

  @ApiProperty({
    type: () => DetailsBaseMuscleDto,
    description: "Workout muscle",
    required: true,
  })
  @Type(() => DetailsBaseMuscleDto)
  @ValidateNested()
  muscle: DetailsBaseMuscleDto;
}
