import { IsNotEmpty,  IsOptional, IsNumber, IsEnum, IsDate, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SocialNotificationTypeEnum } from "../../types";

export class CreateSocialNotificationDto {

  @ApiProperty({
    description: "Notification message",
    example: "Congratulations, you completed the activity XXX and advanced with 80% of the program.",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  message: string;


  @ApiProperty({
    description: "Wheter the user has read the notification",
    example: false,
    required: true,
    default: false
  })
  @IsBoolean()
  isRead: boolean;


  @ApiProperty({
    description: "Wheter the user has clicked the notification",
    example: false,
    required: true,
    default: false
  })
  @IsBoolean()
  isClicked: boolean;


  @ApiProperty({
    description: "Wheter the notification was pushed to the user's devices(s)",
    example: false,
    required: true,
    default: false
  })
  @IsBoolean()
  isPushed: boolean;


  @ApiProperty({
    description: "Date the notification was read",
    example: Date(),
    required: true,
  })
  @IsOptional()
  @IsDate()
  readDate?: Date;


  @ApiProperty({
    description: "Date the notification was clicked",
    example: Date(),
    required: true,
  })
  @IsOptional()
  @IsDate()
  clickedDate?: Date;


  @ApiProperty({
    description: "Date the notification was pushed to the user device(s)",
    example: 3,
    required: true,
  })
  @IsOptional()
  @IsDate()
  pushedDate?: Date;


  @ApiProperty({
    description: "User id to be notified",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;


  @ApiProperty({
    description: "Type of notification",
    example: SocialNotificationTypeEnum.programEvolution,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(SocialNotificationTypeEnum)
  type: SocialNotificationTypeEnum;
}
