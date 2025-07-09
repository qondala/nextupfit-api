import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";


export class CreateBaseBodyParamDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Param name",
    example: "Weight",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Param description",
    example: "This param gives the person's weight in kg",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unity id of the param. Example: 3 = kg",
    example: 3,
    required: false,
  })
  @IsNotEmpty()
  @IsInt()
  unitId?: number;
}
