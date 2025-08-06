import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { UserInterestTypeEnum } from "@app/module/user/types";
import { DetailsGymManagerDto } from ".";

export class DetailsGymManagerInterestDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym manager interest ID",
    required: true,
  })
  id: number;

  @ApiProperty({
    description: "Interest type",
    enum: UserInterestTypeEnum,
    enumName: "UserInterestTypeEnum",
    required: true,
  })
  interestType: UserInterestTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Interest ID",
    required: true,
  })
  interestId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager ID",
    required: true,
  })
  managerId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Creation date",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Update date",
    required: false,
  })
  updatedAt: Date;

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    description: "Gym Manager",
    required: true,
  })
  @Type(() => DetailsGymManagerDto)
  @ValidateNested()
  manager: DetailsGymManagerDto;
}
