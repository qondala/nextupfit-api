import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

import {
  ProgramAccessibilityEnum,
  ProgramVisibilityEnum,
} from "@app/module/program/types";

import { UserManagerFollowerStatus } from "../followership";
import { UserProgramSubscriptionPlanStatus } from "../user-subscription-plan-status";

export class UserProgramAccessStatus {
  @ApiProperty({
    enum: ProgramAccessibilityEnum,
    enumName: "ProgramAccessibilityEnum",
    required: true,
  })
  accessibility: ProgramAccessibilityEnum;

  @ApiProperty({
    enum: ProgramVisibilityEnum,
    enumName: "ProgramVisibilityEnum",
    required: true,
  })
  visibility: ProgramVisibilityEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    isArray: true,
    required: false,
  })
  authorizedMembershipPlanIds?: number[];

  @ApiProperty({
    type: SwaggerType.INTEGER,
    isArray: true,
    required: false,
  })
  authorizedProgramSubscriptionPlanIds?: number[];

  @ApiProperty({
    type: () => UserProgramSubscriptionPlanStatus,
    isArray: true,
    required: false,
  })
  programSubscriptionStatuses: UserProgramSubscriptionPlanStatus[];

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Tells if user has ever subscribed to program",
    required: false,
  })
  everSubscribedToProgram?: boolean;

  @ApiProperty({
    type: () => UserManagerFollowerStatus,
    title: "UserManagerFollowerStatus",
    description: "User manager follower status",
    required: false,
  })
  managerFollowerStatus?: UserManagerFollowerStatus;
}
