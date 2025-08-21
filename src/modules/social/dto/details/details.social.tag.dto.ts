import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

import { SocialTagTargetEnum } from "../../types";

export class DetailsSocialTagDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unique identifier for the tag",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    enum: SocialTagTargetEnum,
    enumName: "SocialTagTargetEnum",
    description: "Target type for the tag",
    example: SocialTagTargetEnum.program,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(SocialTagTargetEnum)
  target: SocialTagTargetEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the target entity being tagged",
    example: 12345,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  targetId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Tag text content",
    example: "fitness",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  tag: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the user who created the tag",
    example: 67890,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  authorUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the manager who created the tag",
    example: 11111,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  authorManagerId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Tag creation date",
    example: "2025-08-21T12:50:28.000Z",
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
