import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";


export class CreateBaseAppUpdateDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Update's version",
    example: "1.0.0",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  version: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Version's name",
    example: "Starter",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Text description of the verion's features",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  features: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Text description of the verion's changes",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  changes: string;
}
