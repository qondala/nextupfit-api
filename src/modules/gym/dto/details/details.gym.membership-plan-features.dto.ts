import { AutoSwagger } from "@app/common/decorators";
import { BaseHighlightColorEnum } from "@app/module/base/types";

import { DetailsGymMembershipPlanDto } from "./";


@AutoSwagger()
export class DetailsGymMembershipPlanFeaturesDto {
  id: number;

  gymId: number;

  gymMembershipPlanId: number;

  description: string;

  highlight?: BaseHighlightColorEnum;


  membershipPlan: DetailsGymMembershipPlanDto;

  createdAt: Date;

  updatedAt: Date;
}
