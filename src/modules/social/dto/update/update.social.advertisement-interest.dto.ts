import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional } from "class-validator";

import { UserInterestTypeEnum } from "@app/module/user/types";
import { SwaggerType } from "@app/common/types";

export class UpdateSocialAdvertisementInterestDto {
  @ApiProperty({
    description: "Interest type",
    enum: UserInterestTypeEnum,
    enumName: "UserInterestTypeEnum",
    example: UserInterestTypeEnum.programGoal,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserInterestTypeEnum)
  interestType?: UserInterestTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Interest ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  interestId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Advertisement ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  advertisementId?: number;
}
