import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsNumber } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class CreateContentCommitmentItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "commitment id",
    example: 1234,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  commitmentId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete before",
    example: 1234,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  completeBefore: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete before time unit id",
    example: 1234,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  completeBeforeTimeUnitId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  position: number;
}
