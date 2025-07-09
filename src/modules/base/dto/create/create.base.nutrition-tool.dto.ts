import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

export class CreateBaseNutritionToolDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Tool name",
    example: "Blender",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Tool description",
    example: "A high-speed blender useful in nutrition plans",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Image URL of the tool",
    example: "https://cdn.example.com/blender.png",
    required: false
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
