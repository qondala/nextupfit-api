import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import {
  SocialNotificationPayload,
  SocialNotificationTypeEnum,
} from "../../types";

export class DetailsSocialNotificationDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Notification ID",
    example: 1,
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User ID",
    example: 12345,
    required: true,
  })
  @IsInt()
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
    description: "Title",
    example: "Your program has evolved!",
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Body",
    example: "Check the new workouts in your program.",
    required: true,
  })
  @IsString()
  body: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Image URL",
    example: "https://example.com/image.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.DATE,
    description: "Creation date",
    example: "2025-07-18T10:00:00.000Z",
    required: true,
    format: "date-time",
  })
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.DATE,
    description: "Scheduled date",
    required: false,
    format: "date-time",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  scheduledAt?: Date;

  @ApiProperty({ type: SwaggerType.BOOLEAN })
  @IsBoolean()
  isDelivered: boolean;

  @ApiProperty({
    type: SwaggerType.DATE,
    required: false,
    format: "date-time",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  deliveredAt?: Date;

  @ApiProperty({ type: SwaggerType.BOOLEAN })
  @IsBoolean()
  isRead: boolean;

  @ApiProperty({
    type: SwaggerType.DATE,
    required: false,
    format: "date-time",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readAt?: Date;

  @ApiProperty({ type: SwaggerType.INTEGER })
  @IsInt()
  priority: number;

  @ApiProperty({ type: () => SocialNotificationPayload, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialNotificationPayload)
  data?: SocialNotificationPayload;
}
