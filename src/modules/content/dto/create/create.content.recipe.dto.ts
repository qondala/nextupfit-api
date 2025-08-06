import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { SwaggerType } from "@app/common/types";

export class CreateContentRecipeDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "content id",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 55,
    description: "recipe id",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  recipeId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Recipe title",
    description: "title",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Recipe description",
    description: "description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    example: true,
    description: "display title",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;
}
