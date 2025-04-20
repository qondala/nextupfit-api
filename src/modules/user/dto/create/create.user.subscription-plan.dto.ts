import { IsNotEmpty, IsEnum, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSubscriptionPlanItemEnum, BaseSubscriptionPlanStatusEnum } from "@app/module/base/types";


export class CreateUserSubscriptionPlanDto {

  @ApiProperty({
    description: "Item the user subscribed to",
    example: BaseSubscriptionPlanItemEnum.program,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseSubscriptionPlanItemEnum)
  item: BaseSubscriptionPlanItemEnum;


  @ApiProperty({
    description: "Item id",
    example: 8,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  itemId: number;


  @ApiProperty({
    description: "Subscription plan status",
    example: BaseSubscriptionPlanStatusEnum.active,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseSubscriptionPlanStatusEnum)
  status: BaseSubscriptionPlanStatusEnum;
}
