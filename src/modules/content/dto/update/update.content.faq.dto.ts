import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateContentFaqDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  contentId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "Frequently asked questions",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "description",
    example: "Some description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "display title flag",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;
}
