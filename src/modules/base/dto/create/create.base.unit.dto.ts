import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseUnitContainanceEnum } from "../../types";


export class CreateBaseUnitDto {

  @ApiProperty({
    description: "Unit's name",
    example: "Kilogram",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    description: "Unit's abbreviation",
    example: "kg",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  abbreviation: string;


  @ApiProperty({
    description: "Unit's containance",
    example: BaseUnitContainanceEnum.weight,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseUnitContainanceEnum)
  containance: BaseUnitContainanceEnum;


  @ApiProperty({
    description: "Unit's display order",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  order?: number;
}
