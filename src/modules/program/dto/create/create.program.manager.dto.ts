import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

import { ProgramItemTypeEnum } from "../../types";

export class CreateProgramManagerDto {
  @ApiProperty({
    description: "Type of program item",
    enum: ProgramItemTypeEnum,
  })
  @IsEnum(ProgramItemTypeEnum)
  @IsNotEmpty()
  itemType: ProgramItemTypeEnum;

  @ApiProperty({
    description: "ID of the program item",
  })
  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @ApiProperty({
    description: "ID of the gym manager",
  })
  @IsNumber()
  @IsNotEmpty()
  managerId: number;
}
