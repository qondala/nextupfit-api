import {
  ProgramStatusEnum,
  ProgramAccessibilityEnum,
  ProgramVisibilityEnum,
  ProgramStepActivityStatusEnum,
} from "@app/module/program/types";

export class ProgramAccessRequirements {

  status: ProgramStatusEnum | ProgramStepActivityStatusEnum;

  accessibility: ProgramAccessibilityEnum;

  visibility: ProgramVisibilityEnum;

  authorizedMembershipPlanIds?: number[];

  authorizedProgramSubscriptionPlanIds?: number[];

  ownerManagerId?: number;
}
