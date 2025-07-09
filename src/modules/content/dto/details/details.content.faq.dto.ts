import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { SwaggerType } from "@app/common/types";

import { DetailsContentFaqItemDto } from "./items";

export class DetailsContentFaqDto {
  @ApiProperty({ type: SwaggerType.INTEGER, description: "record id", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ type: SwaggerType.INTEGER, description: "content id", example: 1234 })
  @IsNotEmpty()
  @IsInt()
  contentId: number;

  @ApiProperty({ type: SwaggerType.STRING, description: "title", example: "FAQ" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: SwaggerType.STRING, description: "description", example: "Some faq desc", required: false })
  @IsString()
  description: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, description: "display title flag", example: true })
  @IsBoolean()
  displayTitle: boolean;

  @ApiProperty({ type: () => DetailsContentFaqItemDto, isArray: true, required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentFaqItemDto)
  items?: DetailsContentFaqItemDto[];
}
