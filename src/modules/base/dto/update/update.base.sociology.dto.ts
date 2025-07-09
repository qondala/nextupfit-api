import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString
} from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateBaseSociologyDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Sociology's name",
    example: "seniors",
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Sociology's description",
    example: "This program is suitable for senior people",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;



  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Sociology's code",
    example: "soc-seniors",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Base sociology group ID",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsInt()
  baseSociologyGroupId?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record created date",
    example: "2022-01-01T00:00:00.000Z",
    required: false
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record updated date",
    example: "2022-01-01T00:00:00.000Z",
    required: false
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
 