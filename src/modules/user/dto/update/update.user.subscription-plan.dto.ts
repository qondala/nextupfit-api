import { IsEnum, IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSubscriptionPlanItemEnum, BaseSubscriptionPlanStatusEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";


export class UpdateUserSubscriptionPlanDto {

  @ApiProperty({
    enum: BaseSubscriptionPlanItemEnum,
    enumName: "BaseSubscriptionPlanItemEnum",
    title: "BaseSubscriptionPlanItemEnum",
    description: "Item the user subscribed to",
    example: BaseSubscriptionPlanItemEnum.program,
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseSubscriptionPlanItemEnum)
  itemType?: BaseSubscriptionPlanItemEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    example: 8,
    required: false,
  })
  @IsOptional()
  @IsInt()
  itemId?: number;


  @ApiProperty({
    enum: BaseSubscriptionPlanStatusEnum,
    enumName: "BaseSubscriptionPlanStatusEnum",
    title: "BaseSubscriptionPlanStatusEnum",
    description: "Subscription plan status",
    example: BaseSubscriptionPlanStatusEnum.active,
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseSubscriptionPlanStatusEnum)
  status?: BaseSubscriptionPlanStatusEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  userId?: number;
}

