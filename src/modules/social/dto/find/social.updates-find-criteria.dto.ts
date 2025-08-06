import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import {
  SocialActorEnum,
  SocialUpdateTypeEnum,
  SocialUpdatePrivacyEnum,
} from "../../types";
import { SocialUpdatesFindOrderEnum } from "./social.updates-find-order.enum";

export class SocialUpdatesFindCriteriaDto {
  @ApiProperty({
    name: "authorUserId",
    type: SwaggerType.INTEGER,
    description: "The ID of the author user",
    example: 1,
    required: false,
  })
  authorUserId?: number;

  @ApiProperty({
    name: "authorManagerId",
    type: SwaggerType.INTEGER,
    description: "The ID of the author manager",
    example: 1,
    required: false,
  })
  authorManagerId?: number;

  @ApiProperty({
    name: "socialActorType",
    enum: SocialActorEnum,
    enumName: "SocialActorEnum",
    description: "The type of social actor",
    example: SocialActorEnum.user,
    required: false,
  })
  socialActorType?: SocialActorEnum;

  @ApiProperty({
    name: "socialActorId",
    type: SwaggerType.INTEGER,
    description: "The ID of the social actor",
    example: 1,
    required: false,
  })
  socialActorId?: number;

  @ApiProperty({
    name: "socialUpdateType",
    enum: SocialUpdateTypeEnum,
    enumName: "SocialUpdateTypeEnum",
    description: "The type of social update",
    example: SocialUpdateTypeEnum.status,
    required: false,
  })
  socialUpdateType?: SocialUpdateTypeEnum;

  @ApiProperty({
    name: "privacy",
    enum: SocialUpdatePrivacyEnum,
    enumName: "SocialUpdatePrivacyEnum",
    description: "The privacy setting for the social update",
    example: SocialUpdatePrivacyEnum.public,
    required: false,
  })
  privacy?: SocialUpdatePrivacyEnum;

  @ApiProperty({
    name: "orderBy",
    enum: SocialUpdatesFindOrderEnum,
    enumName: "SocialUpdatesFindOrderEnum",
    description: "The order by for the social updates",
    required: false,
  })
  orderBy?: SocialUpdatesFindOrderEnum;
}
