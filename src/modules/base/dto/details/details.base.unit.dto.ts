import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";

import { SwaggerType } from "@app/common/types";

import { BaseUnitContainanceEnum } from "../../types";


export class DetailsBaseUnitDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Identifier',
    example: 1
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Unit name',
    example: 'Kilogram'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Abbreviation',
    example: 'kg'
  })
  @IsString()
  @IsNotEmpty()
  abbreviation: string;

  @ApiProperty({
    enum: BaseUnitContainanceEnum,
    enumName: "BaseUnitContainanceEnum",
    description: 'Containance category',
    example: BaseUnitContainanceEnum.weight
  })
  @IsEnum(BaseUnitContainanceEnum)
  containance: BaseUnitContainanceEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Order',
    required: false
  })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Unique code',
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Creation timestamp'
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Last update timestamp'
  })
  updatedAt: Date;
}
