import { IsString, IsOptional, IsInt, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { SocialTagTargetEnum } from "../../types";

export class UpdateSocialTagDto {
  @ApiProperty({
    enum: SocialTagTargetEnum,
    enumName: "SocialTagTargetEnum",
    description: "Target type for the tag",
    example: SocialTagTargetEnum.program,
    required: false,
  })
  @IsOptional()
  @IsEnum(SocialTagTargetEnum)
  target?: SocialTagTargetEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the target entity being tagged",
    example: 12345,
    required: false,
  })
  @IsOptional()
  @IsInt()
  targetId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Tag text content",
    example: "fitness",
    required: false,
  })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the user who created the tag",
    example: 67890,
    required: false,
  })
  @IsOptional()
  @IsInt()
  authorUserId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the manager who created the tag",
    example: 11111,
    required: false,
  })
  @IsOptional()
  @IsInt()
  authorManagerId?: number;
}
