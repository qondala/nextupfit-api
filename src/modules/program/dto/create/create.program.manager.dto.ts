import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsInt } from "class-validator";
import { SwaggerType } from "@app/common/types";

import { ProgramItemTypeEnum } from "../../types";

export class CreateProgramManagerDto {
  @ApiProperty({
    enumName: "ProgramItemTypeEnum",
    enum: ProgramItemTypeEnum,
    description: "Type of program item",
    example: ProgramItemTypeEnum.program,
    required: true,
  })
  @IsEnum(ProgramItemTypeEnum)
  @IsNotEmpty()
  itemType: ProgramItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the program item",
    example: 4335,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager",
    example: 4335,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  managerUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager",
    example: 4335,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  managerId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym",
    example: 4335,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  gymId: number;
}
