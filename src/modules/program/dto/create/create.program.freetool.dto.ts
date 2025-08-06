import { IsNotEmpty, IsOptional, IsInt } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

export class CreateProgramFreetoolDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "The ID of the activity",
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  activityId: number;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: "The ID of the manager",
    example: 1,
  })
  @IsOptional()
  @IsInt()
  managerId?: number;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    nullable: true,
    required: false,
    description: "The ID of the gym",
    example: 1,
  })
  @IsOptional()
  @IsInt()
  gymId?: number;
}
