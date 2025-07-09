import { IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

export class UpdateGymManagerSpecializedInWorkoutDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager user id",
    example: 235,
    required: false,
  })
  @IsOptional()
  @IsInt()
  managerUserId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workout id",
    example: 23,
    required: false,
  })
  @IsOptional()
  @IsInt()
  baseWorkoutId?: number;
}

