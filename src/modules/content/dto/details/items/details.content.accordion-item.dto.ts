import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class DetailsContentAccordionItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "accordion id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  accordionId: number;

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
    description: "description",
    example: "description",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "image url",
    example: "https://example.com/image.jpg",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  position: number;

}