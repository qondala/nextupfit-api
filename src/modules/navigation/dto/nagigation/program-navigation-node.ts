import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsInt } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { ProgramItemTypeEnum } from "@app/module/program/types";

import { ProgramNavigationReasonEnum } from "../../types";

export class ProgramNavigationNode {
  @ApiProperty({
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
    description: "Program item type (Program or Activity)",
    example: ProgramItemTypeEnum.program,
    required: false,
  })
  @IsEnum(ProgramItemTypeEnum)
  programItemType?: ProgramItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program item id",
    required: false,
  })
  programItemId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    required: true,
  })
  userId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program item title",
    required: true,
  })
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program item description",
    required: true,
  })
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program item icon",
    required: true,
  })
  icon?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Activate navigation on this element",
    required: true,
    default: false,
  })
  @IsBoolean()
  canNavigate: boolean;

  @ApiProperty({
    enum: ProgramNavigationReasonEnum,
    enumName: "ProgramNavigationReasonEnum",
    description: "Reason not enabled",
    required: false,
  })
  reasonCannotNavigate: ProgramNavigationReasonEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Milestone percentage in the program trail",
    required: false,
    default: 0,
  })
  @IsInt()
  milestonePercentage?: number;
}
