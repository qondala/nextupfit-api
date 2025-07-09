import { IsNotEmpty, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

export class CreateGymSpecializedInWorkoutDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    example: 235,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gymId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workout id",
    example: 23,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  baseWorkoutId: number;
}
