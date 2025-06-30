import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional } from "class-validator";

import { ProgramItemTypeEnum } from "../../types";

export class UpdateProgramManagerDto {
  @ApiProperty({
    description: "Type of program item",
    enum: ProgramItemTypeEnum,
    required: false,
  })
  @IsEnum(ProgramItemTypeEnum)
  @IsOptional()
  itemType?: ProgramItemTypeEnum;

  @ApiProperty({
    description: "ID of the program item",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  itemId?: number;

  @ApiProperty({
    description: "ID of the gym manager",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  managerId?: number;
}
