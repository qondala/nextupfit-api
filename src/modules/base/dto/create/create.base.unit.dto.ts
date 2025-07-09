import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { BaseUnitContainanceEnum } from "../../types";


export class CreateBaseUnitDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Unit's name",
    example: "Kilogram",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Unit's abbreviation",
    example: "kg",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  abbreviation: string;


  @ApiProperty({
    enum: BaseUnitContainanceEnum,
    enumName: "BaseUnitContainanceEnum",
    description: "Unit's containance",
    example: BaseUnitContainanceEnum.weight,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseUnitContainanceEnum)
  containance: BaseUnitContainanceEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unit's display order",
    example: 1,
  })
  @IsOptional()
  @IsInt()
  order?: number;
}
