import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional } from "class-validator";

import { UserInterestTypeEnum } from "@app/module/user/types";
import { SwaggerType } from "@app/common/types";
import { FindOrderByEnum } from "@app/common/dto";

export class SocialFindCriteriaUpdateInterestDto {
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
    description: "Update ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  updateId?: number;

  @ApiProperty({
    enum: FindOrderByEnum,
    enumName: "FindOrderByEnum",
    description: "Order by",
    example: FindOrderByEnum.date,
    required: false,
  })
  @IsOptional()
  @IsEnum(FindOrderByEnum)
  orderBy?: FindOrderByEnum;
}
