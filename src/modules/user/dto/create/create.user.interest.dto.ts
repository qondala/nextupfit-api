import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { UserInterestTypeEnum } from "@app/module/user/types";

export class CreateUserInterestDto {
  @ApiProperty({
    enum: UserInterestTypeEnum,
    enumName: "UserInterestTypeEnum",
    description: "Type of interest",
    example: UserInterestTypeEnum.sociology,
  })
  @IsEnum(UserInterestTypeEnum)
  interestType: UserInterestTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the related entity matching the interest type",
    example: 123,
  })
  @IsInt()
  interestId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User ID",
    example: 123,
  })
  @IsInt()
  userId: number;
}
