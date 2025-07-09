import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

import { SwaggerType } from "@app/common/types";


export class DetailsContentTextareaDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "title",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "content",
    example: "content",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "display title",
    example: true,
    required: true,
  })
  @IsBoolean()
  displayTitle: boolean;
}
