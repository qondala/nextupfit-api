import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { UserInterestTypeEnum } from "@app/module/user/types";
import { FindOrderByEnum } from "@app/common/dto";

export class GymFindCriteriaInterestDto {
  @ApiProperty({
    description: "Interest type",
    enum: UserInterestTypeEnum,
    enumName: "UserInterestTypeEnum",
    required: false,
  })
  @IsOptional()
  interestType?: UserInterestTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Interest ID",
    required: false,
  })
  @IsOptional()
  interestId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym ID",
    required: false,
  })
  @IsOptional()
  gymId?: number;

  @ApiProperty({
    description: "Order by",
    enum: FindOrderByEnum,
    enumName: "FindOrderByEnum",
    required: false,
  })
  @IsOptional()
  orderBy?: FindOrderByEnum;
}
