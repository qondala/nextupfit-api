import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

import {
  ContentTextColorEnum,
  ContentTextStyleEnum,
} from "@app/module/content/types";

export class DetailsContentPrerequisitesItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "record id",
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "prerequisites id",
  })
  @IsNumber()
  @IsNotEmpty()
  prerequisitesId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Prerequisite name",
    description: "name",
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Prerequisite description",
    description: "description",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 0,
    description: "position",
  })
  @IsNumber()
  @IsNotEmpty()
  position: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 0,
    description: "importance",
  })
  @IsNumber()
  @IsNotEmpty()
  importance: number;

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
  textStyles?: ContentTextStyleEnum[];

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
