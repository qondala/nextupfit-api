import { ApiProperty } from "@nestjs/swagger";

import { ProgramItemTypeEnum } from "../../types";
import { IsNotEmpty, IsNumber, IsEnum } from "class-validator";

export class CreateProgramManagerDto {

  @ApiProperty({
    description: "Item type",
    example: ProgramItemTypeEnum.program,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ProgramItemTypeEnum)
  itemType: ProgramItemTypeEnum;


  @ApiProperty({
    description: "Item id",
    example: 43354534,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  itemId: number;


  @ApiProperty({
    description: "Id of the gym manager",
    example: 43354534,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;

}
