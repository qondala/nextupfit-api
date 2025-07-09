import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsInt,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsContentCommitmentItemDto } from "../details/items";

export class CreateContentCommitmentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "title",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "description",
    example: "description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "display title",
    example: true,
    required: false,
  })
  @IsBoolean()
  displayTitle?: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete within",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  completeWithin: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete within time unit id",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  completeWithinTimeUnitId: number;

  @ApiProperty({
    type: () => DetailsContentCommitmentItemDto,
    isArray: true,
    description: "Commitment items",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentCommitmentItemDto)
  items?: DetailsContentCommitmentItemDto[];
}
