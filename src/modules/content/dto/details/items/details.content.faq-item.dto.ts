import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class DetailsContentFaqItemDto {
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
    description: "FAQ block id (contentFaqId)",
    example: 100,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentFaqId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Question text",
    example: "What is keto diet?",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Answer text",
    example: "Keto diet is ...",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  answer: string;
}
