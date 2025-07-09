import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

import {
  ContentTextColorEnum,
  ContentTextStyleEnum,
} from "@app/module/content/types";

export class DetailsContentSusbcriptionPlanItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record id",
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content subscription plan id",
    required: true,
  })
  @IsInt()
  contentSubscriptionPlanId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Title",
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Display description",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayDescription?: boolean;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Icon",
    required: false,
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({
    description: "Text styles",
    required: false,
    isArray: true,
    enum: ContentTextStyleEnum,
    example: Object.values(ContentTextStyleEnum),
  })
  @IsOptional()
  @IsArray()
  @IsEnum(ContentTextStyleEnum, { each: true })
  textStyles: ContentTextStyleEnum[];

  @ApiProperty({
    description: "Text color",
    required: false,
    enum: ContentTextColorEnum,
    example: ContentTextColorEnum.red,
  })
  @IsOptional()
  @IsEnum(ContentTextColorEnum)
  textColor?: ContentTextColorEnum;
}
