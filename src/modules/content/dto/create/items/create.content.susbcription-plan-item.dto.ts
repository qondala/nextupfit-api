import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { SwaggerType } from "@app/common/types";
import {
  ContentTextColorEnum,
  ContentTextStyleEnum,
} from "@app/module/content/types";

export class CreateContentSusbcriptionPlanItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content subscription plan id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentSubscriptionPlanId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Title",
    example: "Premium feature",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description",
    example: "Detailed description for the feature",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Display description flag",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayDescription?: boolean;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Icon (URL or class)",
    example: "star",
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
