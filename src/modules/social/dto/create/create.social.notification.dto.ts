import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { SocialNotificationPayload, SocialNotificationTypeEnum } from "../../types";

export class CreateSocialNotificationDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the user to whom notification belongs",
    example: 12345,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    enum: SocialNotificationTypeEnum,
    enumName: "SocialNotificationTypeEnum",
    description: "Notification type",
    example: SocialNotificationTypeEnum.programEvolution,
    required: true,
  })
  @IsEnum(SocialNotificationTypeEnum)
  type: SocialNotificationTypeEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Notification title",
    example: "Your program has evolved!",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Notification body",
    example: "Check the new workouts in your program.",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Optional image URL",
    example: "https://example.com/image.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.DATE,
    description: "Schedule date",
    example: "2025-07-18T10:00:00.000Z",
    required: false,
    format: "date-time",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  scheduledAt?: Date;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Priority (1 high ...)",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  priority?: number;

  @ApiProperty({
    type: () => SocialNotificationPayload,
    description: "Optional payload data",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialNotificationPayload)
  data?: SocialNotificationPayload;
}
