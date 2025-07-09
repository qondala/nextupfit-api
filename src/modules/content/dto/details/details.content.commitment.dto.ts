import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { DetailsContentCommitmentItemDto } from "./items";
import { SwaggerType } from "@app/common/types";


export class DetailsContentCommitmentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "title",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "description",
    example: "description",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "display title",
    example: true,
    required: true,
  })
  @IsBoolean()
  displayTitle: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete within",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  completeWithin: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete within time unit id",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  completeWithinTimeUnitId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "created at",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "updated at",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  updatedAt: Date;


  @ApiProperty({
    type: () => DetailsContentCommitmentItemDto,
    title: "DetailsContentCommitmentItemDto",
    isArray: true,
    description: "Commitment items",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentCommitmentItemDto)
  items: DetailsContentCommitmentItemDto[];
}
