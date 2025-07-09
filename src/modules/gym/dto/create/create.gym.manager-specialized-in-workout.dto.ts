import { IsNotEmpty, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";


export class CreateGymManagerSpecializedInWorkoutDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager user id",
    example: 235,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  managerUserId: number;


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
