import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { UserInterestTypeEnum } from "@app/module/user/types";

export class UpdateUserInterestDto {
  @ApiProperty({
    enum: UserInterestTypeEnum,
    enumName: "UserInterestTypeEnum",
    required: false,
    description: "Type of interest",
    example: UserInterestTypeEnum.nutrition,
  })
  @IsEnum(UserInterestTypeEnum)
  @IsOptional()
  interestType?: UserInterestTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    description: "ID of the related entity matching the interest type",
    example: 456,
  })
  @IsInt()
  @IsOptional()
  interestId?: number;
}
