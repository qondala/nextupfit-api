import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateContentCommitmentItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "commitment id",
    example: 1234,
    required: false
  })
  @IsOptional()
  @IsInt()
  commitmentId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete before",
    example: 1234,
    required: false
  })
  @IsOptional()
  @IsInt()
  completeBefore?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete before time unit id",
    example: 1234,
    required: false
  })
  @IsOptional()
  @IsInt()
  completeBeforeTimeUnitId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  position?: number;
}
