import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { DetailsBaseRecipeInstructionDto } from "./details.base.recipe-instruction.dto";
import { DetailsBaseRecipeItemDto } from "./details.base.recipe-item.dto";
import { IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { DetailsBaseUnitDto } from "./details.base.unit.dto";

export class DetailsBaseRecipeDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
  })
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: false,
  })
  duration: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  durationUnitId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  code?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  nbPersons?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  ownerManagerId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: false,
  })
  updatedAt?: Date;

  @ApiProperty({
    type: () => DetailsBaseRecipeItemDto,
    isArray: true,
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseRecipeItemDto)
  items?: DetailsBaseRecipeItemDto[];

  @ApiProperty({
    type: () => DetailsBaseRecipeInstructionDto,
    isArray: true,
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseRecipeInstructionDto)
  instructions?: DetailsBaseRecipeInstructionDto[];

  @ApiProperty({
    type: () => DetailsBaseUnitDto,
    title: "DetailsBaseUnitDto",
    description: "Duration unit details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsBaseUnitDto)
  durationUnit: DetailsBaseUnitDto;
}
