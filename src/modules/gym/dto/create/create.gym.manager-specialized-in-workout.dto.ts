import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateGymManagerSpecializedInWorkoutDto {

  @ApiProperty({
    description: "Manager user id",
    example: 235,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;


  @ApiProperty({
    description: "Workout id",
    example: 23,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  baseWorkoutId: number;
}
