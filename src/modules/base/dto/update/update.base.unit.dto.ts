import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseUnitContainanceEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class UpdateBaseUnitDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Unit's name",
    example: "Kilogram",
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Unit's abbreviation",
    example: "kg",
    required: false
  })
  @IsOptional()
  @IsString()
  abbreviation?: string;


  @ApiProperty({
    enum: BaseUnitContainanceEnum,
    enumName: "BaseUnitContainanceEnum",
    description: "Unit's containance",
    example: BaseUnitContainanceEnum.weight,
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseUnitContainanceEnum)
  containance?: BaseUnitContainanceEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unit's display order",
    example: 1,
  })
  @IsOptional()
  @IsInt()
  order?: number;
}
