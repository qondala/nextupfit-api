import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SocialTagTargetEnum } from "../../types";

export class CreateSocialTagDto {
  @ApiProperty({
    description: "Target type for the tag",
    example: SocialTagTargetEnum.program,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(SocialTagTargetEnum)
  target: SocialTagTargetEnum;

  @ApiProperty({
    description: "ID of the target entity being tagged",
    example: 12345,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  targetId: number;

  @ApiProperty({
    description: "Tag text content",
    example: "fitness",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  tag: string;

  @ApiProperty({
    description: "ID of the user who created the tag",
    example: 67890,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  authorUserId: number;

  @ApiProperty({
    description: "ID of the manager who created the tag",
    example: 11111,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  authorManagerId: number;
}
