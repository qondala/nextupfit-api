import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsUrl } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class DetailsContentCarouselItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "carousel id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  carouselId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "title",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "description",
    example: "description",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "media url",
    example: "https://example.com/image.jpg",
    required: true,
  })
  @IsNotEmpty()
  @IsUrl()
  mediaUrl: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  position: number;
}
