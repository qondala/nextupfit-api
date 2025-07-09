import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsContentCommitmentItemDto } from "../details/items";

export class UpdateContentCommitmentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  contentId?: number;

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
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete within",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  completeWithin?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "complete within time unit id",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  completeWithinTimeUnitId?: number;

  @ApiProperty({
    type: () => DetailsContentCommitmentItemDto,
    isArray: true,
    description: "Commitment items",
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentCommitmentItemDto)
  items?: DetailsContentCommitmentItemDto[];
}
