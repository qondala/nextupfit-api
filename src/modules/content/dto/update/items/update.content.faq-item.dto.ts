import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateContentFaqItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "FAQ block id (contentFaqId)",
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  contentFaqId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Question text",
    example: "What is keto diet?",
    required: false,
  })
  @IsOptional()
  @IsString()
  question?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Answer text",
    example: "Keto diet is ...",
    required: false,
  })
  @IsOptional()
  @IsString()
  answer?: string;
}
