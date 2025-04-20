import { AutoSwagger } from "@app/common/decorators";

import {
  BaseSubscriptionPlanItemEnum,
  BaseSubscriptionPlanStatusEnum
} from "@app/module/base/types";



@AutoSwagger()
export class DetailsUserSubscriptionPlanDto {

  id: number;


  item: BaseSubscriptionPlanItemEnum;

  
  itemId: number;

  
  status: BaseSubscriptionPlanStatusEnum;

  
  createdAt: Date;

  
  updatedAt: Date;
}
