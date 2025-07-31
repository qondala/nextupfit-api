import {
  ApiProperty
} from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsOptional
} from "class-validator";

import {
  SwaggerType
} from "@app/common/types";
import {
  UserInterestTypeEnum
} from "@app/module/user/types";

export class UpdateProgramInterestDto {
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
    description: "Program ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programId?: number;
}
