import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { DetailsBaseRecipeInstructionTagDto } from ".";
import { IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class DetailsBaseRecipeInstructionDto {
  @ApiProperty({ type: SwaggerType.INTEGER })
  id: number;

  @ApiProperty({ type: SwaggerType.STRING })
  title: string;

  @ApiProperty({ type: SwaggerType.STRING, required: false })
  description?: string;

  @ApiProperty({ type: SwaggerType.STRING, required: false })
  imageUrl?: string;

  @ApiProperty({ type: SwaggerType.INTEGER, required: false })
  order?: number;

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
    type: () => DetailsBaseRecipeInstructionTagDto,
    title: "DetailsBaseRecipeInstructionTagDto",
    description: "Recipe instruction tag details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsBaseRecipeInstructionTagDto)
  tags: DetailsBaseRecipeInstructionTagDto[];
}
