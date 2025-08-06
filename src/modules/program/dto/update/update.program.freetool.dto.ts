import { IsOptional, IsEnum, IsInt } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

export class UpdateProgramFreetoolDto {
  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: "The ID of the activity",
  })
  @IsOptional()
  @IsInt()
  activityId?: number;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: "The ID of the manager",
  })
  @IsOptional()
  @IsInt()
  managerId?: number;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: "The ID of the gym",
  })
  @IsOptional()
  @IsInt()
  gymId?: number;
}
