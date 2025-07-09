import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsInt } from "class-validator";

import { SwaggerType } from "@app/common/types";

import { ProgramItemTypeEnum } from "../../types";

export class UpdateProgramManagerDto {

  @ApiProperty({
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
    title: "ProgramItemTypeEnum",
    description: "Item type",
    example: ProgramItemTypeEnum.program,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramItemTypeEnum)
  itemType?: ProgramItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    example: 43354534,
    required: false,
  })
  @IsOptional()
  @IsInt()
  itemId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager",
    example: 4335,
    required: false,
  })
  @IsInt()
  @IsOptional()
  managerUserId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager",
    example: 4335,
    required: false,
  })
  @IsInt()
  @IsOptional()
  managerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym",
    example: 4335,
    required: false,
  })
  @IsInt()
  @IsOptional()
  gymId?: number;
}
