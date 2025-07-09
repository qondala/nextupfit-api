import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateContentCarouselItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "carousel id",
    example: 1234,
    required: false
  })
  @IsOptional()
  @IsInt()
  carouselId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "title",
    required: false
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "description",
    example: "description",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "image url",
    example: "https://example.com/image.jpg",
    required: false
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsInt()
  position?: number;
}
