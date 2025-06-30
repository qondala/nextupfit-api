import { ApiProperty } from "@nestjs/swagger";

import { ProgramItemTypeEnum } from "../../types";
import { IsNotEmpty, IsNumber, IsEnum } from "class-validator";

export class DetailsProgramManagerDto {

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
    description: "Manager id",
    example: 43354534,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerId: number;

  
}
