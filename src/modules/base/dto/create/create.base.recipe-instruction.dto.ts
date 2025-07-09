import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class CreateBaseRecipeInstructionDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Title",
    maxLength: 255
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
    description: "Description"
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
    description: "Image URL"
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    description: "Order index"
  })
  @IsOptional()
  @IsInt()
  order?: number;
}
