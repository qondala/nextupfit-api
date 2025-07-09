import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsOptional,
  IsString
} from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateBaseSociologyGroupDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Sociology group's name",
    example: "Age Group",
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Sociology group's description",
    example: "This sociology group is adapted for people of this age group",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Sociology group's code",
    example: "age-group",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;


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
