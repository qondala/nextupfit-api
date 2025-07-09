import { IsNotEmpty, IsEnum, IsNumber, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSubscriptionPlanItemEnum, BaseSubscriptionPlanStatusEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";


export class CreateUserSubscriptionPlanDto {

  @ApiProperty({
    enum: BaseSubscriptionPlanItemEnum,
    enumName: "BaseSubscriptionPlanItemEnum",
    title: "BaseSubscriptionPlanItemEnum",
    description: "Item the user subscribed to",
    example: BaseSubscriptionPlanItemEnum.program,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseSubscriptionPlanItemEnum)
  itemType: BaseSubscriptionPlanItemEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    example: 8,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  itemId: number;


  @ApiProperty({
    enum: BaseSubscriptionPlanStatusEnum,
    enumName: "BaseSubscriptionPlanStatusEnum",
    title: "BaseSubscriptionPlanStatusEnum",
    description: "Subscription plan status",
    example: BaseSubscriptionPlanStatusEnum.active,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseSubscriptionPlanStatusEnum)
  status: BaseSubscriptionPlanStatusEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
