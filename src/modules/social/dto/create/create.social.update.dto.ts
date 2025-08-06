import { IsNotEmpty, IsEnum, IsOptional, IsInt } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import {
  SocialActorEnum,
  SocialUpdateTypeEnum,
  SocialUpdatePrivacyEnum,
} from "../../types";

export class CreateSocialUpdateDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "The ID of the author user",
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  authorUserId: number;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: "The ID of the author manager",
    example: 1,
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsInt()
  authorManagerId?: number;

  @ApiProperty({
    enum: SocialActorEnum,
    enumName: "SocialActorEnum",
    description: "The type of social actor",
    example: SocialActorEnum.user,
  })
  @IsNotEmpty()
  @IsEnum(SocialActorEnum)
  socialActorType: SocialActorEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "The ID of the social actor",
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  socialActorId: number;

  @ApiProperty({
    enum: SocialUpdateTypeEnum,
    enumName: "SocialUpdateTypeEnum",
    description: "The type of social update",
    example: SocialUpdateTypeEnum.status,
  })
  @IsNotEmpty()
  @IsEnum(SocialUpdateTypeEnum)
  socialUpdateType: SocialUpdateTypeEnum;

  @ApiPropertyOptional({
    enum: SocialUpdatePrivacyEnum,
    enumName: "SocialUpdatePrivacyEnum",
    description: "The privacy setting for the social update",
    example: SocialUpdatePrivacyEnum.public,
    default: SocialUpdatePrivacyEnum.public,
    required: false,
  })
  @IsOptional()
  @IsEnum(SocialUpdatePrivacyEnum)
  privacy?: SocialUpdatePrivacyEnum;
}
