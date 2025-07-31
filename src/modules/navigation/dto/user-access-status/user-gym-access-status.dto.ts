import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  ValidateNested
} from "class-validator";

import { SwaggerType } from "@app/common/types";
import {
  UserGymFollowerStatus,
} from "../followership";
import {
  UserGymMembershipPlanStatus,
} from "../user-subscription-plan-status";


export class UserGymAccessStatus {

  @ApiProperty({
    type: () => UserGymFollowerStatus,
    title: "UserGymFollowerStatus",
    description: "Gym follower status",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => UserGymFollowerStatus)
  followerStatus?: UserGymFollowerStatus;

  @ApiProperty({
    type: () => UserGymMembershipPlanStatus,
    isArray: true,
    description: "Gym membership statuses",
    required: true,
  })
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => UserGymMembershipPlanStatus)
  membershipStatuses: UserGymMembershipPlanStatus[];

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Member status of the gym membership',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isMember: boolean;
}
