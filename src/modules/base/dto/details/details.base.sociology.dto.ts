import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsBaseSociologyGroupDto } from ".";

export class DetailsBaseSociologyDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Sociology's name",
    example: "seniors",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Sociology's description",
    example: "This program is suitable for senior people",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Sociology's code",
    example: "soc-seniors",
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Base sociology group ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  baseSociologyGroupId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record created date",
    example: "2022-01-01T00:00:00.000Z",
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record updated date",
    example: "2022-01-01T00:00:00.000Z",
    required: false,
  })
  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    type: () => DetailsBaseSociologyGroupDto,
    description: "Base sociology group",
    required: false,
  })
  @Type(() => DetailsBaseSociologyGroupDto)
  @ValidateNested()
  baseSociologyGroup: DetailsBaseSociologyGroupDto;
}
