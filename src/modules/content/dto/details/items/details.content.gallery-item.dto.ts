import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNotEmpty, IsNumber } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class DetailsContentGalleryItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content gallery id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  contentGalleryId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description",
    example: "Gallery item description",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Media URL",
    example: "https://example.com/media.jpg",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  mediaurl: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Position",
    example: 0,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  position: number;
}
