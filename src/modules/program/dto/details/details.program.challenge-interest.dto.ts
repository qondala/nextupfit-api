import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { UserInterestTypeEnum } from "@app/module/user/types";
import { DetailsProgramStepActivityWorkingsessionPracticeDto } from "./details.program.step-activity-workingsession-practice.dto";

export class DetailsProgramChallengeInterestDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program challenge interest ID",
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
    description: "Working session practice ID",
    required: true,
  })
  workingSessionPracticeId: number;

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
    type: () => DetailsProgramStepActivityWorkingsessionPracticeDto,
    description: "Working session practice",
    required: true,
  })
  @Type(() => DetailsProgramStepActivityWorkingsessionPracticeDto)
  @ValidateNested()
  practice: DetailsProgramStepActivityWorkingsessionPracticeDto;
}
