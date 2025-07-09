
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateBaseRecipeInstructionDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
    description: "Title",
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

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
