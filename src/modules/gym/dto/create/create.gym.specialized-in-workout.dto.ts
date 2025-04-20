import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGymSpecializedInWorkoutDto {

  @ApiProperty({
    description: "Gym id",
    example: 235,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    description: "Workout id",
    example: 23,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  baseWorkoutId: number;
}
