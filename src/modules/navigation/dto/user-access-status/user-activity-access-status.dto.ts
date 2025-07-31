import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

export class UserActivityAccessStatus {

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is user following gym?",
    required: true,
    default: false,
  })
  isFreeTool: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is user gym member?",
    required: true,
  })
  isGymMember: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User subscribed gym membership plan ids",
    isArray: true,
    example: [1, 2, 3],
    default: [],
    required: true,
  })
  userSubscribebGymMembershipPlanIds: number[];

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User subscribed and paid gym membership plan ids",
    isArray: true,
    example: [1, 2, 3],
    default: [],
    required: true,
  })
  userSubscribebAndPaidGymMembershipPlanIds: number[];

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym available membership plan ids",
    isArray: true,
    example: [1, 2, 3],
    default: [],
    required: true,
  })
  gymAvailableMembershipPlanIds: number[];
}
