import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class CreateContentChallengesItemDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "id of the visual content",
    example: 1234,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  challengesId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "challenge id",
    example: 1234,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  challengeId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  position: number;
}
