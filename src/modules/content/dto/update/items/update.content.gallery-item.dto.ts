import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateContentGalleryItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content gallery id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  contentGalleryId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description",
    example: "Gallery item description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Media URL",
    example: "https://example.com/media.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  mediaurl?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Position",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  position?: number;
}
