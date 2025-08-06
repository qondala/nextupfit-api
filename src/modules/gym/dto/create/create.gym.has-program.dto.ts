import { IsNotEmpty, IsNumber, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ProgramItemTypeEnum } from "@app/module/program/types";

export class CreateGymHasProgramDto {
  @ApiProperty({
    description: "The ID of the gym",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;

  @ApiProperty({
    description: "The type of program item",
    enum: ProgramItemTypeEnum,
    example: ProgramItemTypeEnum.program,
  })
  @IsNotEmpty()
  @IsEnum(ProgramItemTypeEnum)
  itemType: ProgramItemTypeEnum;

  @ApiProperty({
    description: "The ID of the program item",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @ApiProperty({
    description: "The ID of the owner manager",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  owerManagerId: number;
}
