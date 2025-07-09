import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { SwaggerType } from "@app/common/types";

import { BaseConsumptionProgramEnum } from "@app/module/base/types";
import { DetailsContentConsumptionItemDto } from "./items";



export class DetailsContentConsumptionDto {
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
    description: "content id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;


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
    type: SwaggerType.BOOLEAN,
    description: "display title",
    example: true,
    required: true,
  })
  @IsBoolean()
  displayTitle: boolean;


  @ApiProperty({
    enum: BaseConsumptionProgramEnum,
    enumName: "BaseConsumptionProgramEnum",
    description: "Content type",
    example: BaseConsumptionProgramEnum.nutrition,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseConsumptionProgramEnum)
  typeConsumption: BaseConsumptionProgramEnum;


  @ApiProperty({
    type: () => DetailsContentConsumptionItemDto,
    title: "DetailsContentConsumptionItemDto",
    isArray: true,
    description: "Consumption items",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentConsumptionItemDto)
  items: DetailsContentConsumptionItemDto[];
}
