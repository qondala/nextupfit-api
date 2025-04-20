import { PartialType } from "@nestjs/mapped-types";

import { CreateUserSubscriptionPlanDto } from "../create";

export class UpdateUserSubscriptionPlanDto extends PartialType(CreateUserSubscriptionPlanDto) {}
