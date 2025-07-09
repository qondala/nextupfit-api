import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { SocialNotificationTypeEnum } from ".";

export class SocialNotificationPayload {

  @ApiProperty({
    enum: SocialNotificationTypeEnum,
    enumName: "SocialNotificationTypeEnum",
    description: "Type of the notification",
    example: SocialNotificationTypeEnum.programEvolution,
    required: true,
  })
  @IsEnum(SocialNotificationTypeEnum)
  itemType: SocialNotificationTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  itemId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  @IsString()
  message?: string;
}
