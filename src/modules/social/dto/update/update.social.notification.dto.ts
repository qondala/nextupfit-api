import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsDate,
  IsBoolean,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { SocialNotificationPayload } from "../../types";

export class UpdateSocialNotificationDto {

  @ApiProperty({
    type: SwaggerType.STRING,
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
    type: SwaggerType.STRING,
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
    type: SwaggerType.STRING,
    required: false,
    format: "date-time",
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readAt?: Date;

  @ApiProperty({
    type: () => SocialNotificationPayload,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialNotificationPayload)
  data?: SocialNotificationPayload;
}
