import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDefined, IsEnum, IsInt, ValidateNested } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { UserInterestCompositeDto, UserInterestTypeEnum } from "@app/module/user/types";
import { Type } from "class-transformer";

export class DetailsUserInterestDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    enum: UserInterestTypeEnum,
    enumName: "UserInterestTypeEnum",
  })
  @IsEnum(UserInterestTypeEnum)
  interestType: UserInterestTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Interest id",
    required: true,
  })
  @IsInt()
  interestId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    type: () => UserInterestCompositeDto,
    title: "UserInterestCompositeDto",
    description: "Interest composite",
    required: false,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => UserInterestCompositeDto)
  interest: UserInterestCompositeDto;
}
