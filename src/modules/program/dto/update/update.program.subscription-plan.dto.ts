import { PartialType } from "@nestjs/mapped-types";

import { CreateProgramSubscriptionPlanDto } from "../create";

export class UpdateProgramSubscriptionPlanDto extends PartialType(CreateProgramSubscriptionPlanDto) {}
