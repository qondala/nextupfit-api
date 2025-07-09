import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class DetailsContentCommitmentItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "commitment id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  commitmentId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete before",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  completeBefore: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete before time unit id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  completeBeforeTimeUnitId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  position: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Content created date",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Content updated date",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  updatedAt: Date;
}