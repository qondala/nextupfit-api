import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, IsBoolean, IsEnum } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { ContentLayoutEnum } from "../../types";

export class UpdateContentGalleryDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  contentId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Title",
    example: "Gallery title",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description",
    example: "Gallery description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Display title",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;

  @ApiProperty({
    enum: ContentLayoutEnum,
    enumName: "ContentLayoutEnum",
    description: "Layout",
    example: ContentLayoutEnum.grid,
    required: false,
  })
  @IsOptional()
  @IsEnum(ContentLayoutEnum)
  layout?: ContentLayoutEnum;
}
