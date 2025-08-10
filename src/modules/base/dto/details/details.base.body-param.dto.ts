import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsBaseUnitDto } from ".";

export class DetailsBaseBodyParamDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Identifier",
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Param name",
    example: "Weight",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Param description",
    example: "Person weight in kg",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unit ID",
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  unitId?: number;

  @ApiProperty({
    type: () => DetailsBaseUnitDto,
    description: "Unit",
    required: false,
  })
  @Type(() => DetailsBaseUnitDto)
  @ValidateNested()
  unit: DetailsBaseUnitDto;
}
