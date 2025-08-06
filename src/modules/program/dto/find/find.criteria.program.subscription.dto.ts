import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsEnum, IsDate } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseSubscriptionPlanStatusEnum } from "@app/module/base/types";

export class ProgramFindCriteriaSubscriptionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program subscription record id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program id",
    example: 5678,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Subscriber user id",
    example: 9012,
    required: false,
  })
  @IsOptional()
  @IsInt()
  subscriberUserId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program subscription plan id",
    example: 3456,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programSubscriptionPlanId?: number;

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
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseSubscriptionPlanStatusEnum)
  status?: BaseSubscriptionPlanStatusEnum;
}
