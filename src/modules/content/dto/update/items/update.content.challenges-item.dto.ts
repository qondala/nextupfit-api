import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateContentChallengesItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "challenge id",
    example: 1234,
    required: false
  })
  @IsOptional()
  @IsInt()
  challengesId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "challenge id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  challengeId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsInt()
  position?: number;
}
