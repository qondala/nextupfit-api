import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt } from "class-validator";

import { UserInterestTypeEnum } from "@app/module/user/types";
import { SwaggerType } from "@app/common/types";

export class CreateGymInterestDto {
  @ApiProperty({
    description: "Interest type",
    enum: UserInterestTypeEnum,
    enumName: "UserInterestTypeEnum",
    example: UserInterestTypeEnum.programGoal,
    required: true,
  })
  @IsEnum(UserInterestTypeEnum)
  interestType: UserInterestTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Interest ID",
    example: 1,
    required: true,
  })
  @IsInt()
  interestId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym ID",
    example: 1,
    required: true,
  })
  @IsInt()
  gymId: number;
}
