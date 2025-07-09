import { IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

export class UpdateGymManagerSpecializedInWorkoutDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager id",
    example: 235,
    required: false,
  })
  @IsOptional()
  @IsInt()
  managerId?: number;


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

