import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class CreateContentRecipeDto {
  @ApiProperty({ type: SwaggerType.INTEGER, required: true, example: 1001 })
  @IsNotEmpty()
  @IsInt()
  contentId: number;

  @ApiProperty({ type: SwaggerType.INTEGER, required: true, example: 55 })
  @IsNotEmpty()
  @IsInt()
  recipeId: number;

  @ApiProperty({ type: SwaggerType.STRING, required: false, example: "Recipe title" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: SwaggerType.STRING, required: false, example: "Recipe description" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, required: false, default: false })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;
}
