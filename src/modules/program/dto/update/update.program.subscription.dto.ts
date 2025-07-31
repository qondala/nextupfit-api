import {
  ApiProperty
} from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsEnum,
  IsDateString,
} from "class-validator";

import {
  SwaggerType
} from "@app/common/types";
import {
  BaseSubscriptionPlanStatusEnum
} from "@app/module/base/types";

export class UpdateProgramSubscriptionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program id",
    example: 5678,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Subscriber user id",
    example: 9012,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  subscriberUserId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program subscription plan id",
    example: 3456,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programSubscriptionPlanId?: number;

  @ApiProperty({
    type: SwaggerType.DATE,
    description: "Subscription start date",
    example: "2024-01-15T10:30:00Z",
    required: false,
  })
  @IsOptional()
  @IsDateString()
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
