import {
  ApiProperty
} from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsDate,
} from "class-validator";

import {
  SwaggerType
} from "@app/common/types";
import {
  BaseSubscriptionPlanStatusEnum
} from "@app/module/base/types";

export class DetailsProgramSubscriptionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program subscription record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program id",
    example: 5678,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  programId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Subscriber user id",
    example: 9012,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  subscriberUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program subscription plan id",
    example: 3456,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  programSubscriptionPlanId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Subscription start date",
    example: "2024-01-15T10:30:00Z",
    required: false,
  })
  @IsOptional()
  @IsDate()
  startedDate?: Date;

  @ApiProperty({
    enum: BaseSubscriptionPlanStatusEnum,
    description: "Subscription status",
    example: BaseSubscriptionPlanStatusEnum.active,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseSubscriptionPlanStatusEnum)
  status: BaseSubscriptionPlanStatusEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record creation date",
    example: "2024-01-15T10:30:00Z",
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record last update date",
    example: "2024-01-15T10:30:00Z",
    required: false,
  })
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
