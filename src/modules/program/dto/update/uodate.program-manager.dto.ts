import { ApiProperty } from "@nestjs/swagger";

import { ProgramItemTypeEnum } from "../../types";
import { IsNumber, IsEnum, IsOptional } from "class-validator";

export class UpdateProgramManagerDto {

  @ApiProperty({
    description: "Item type",
    example: ProgramItemTypeEnum.program,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramItemTypeEnum)
  itemType?: ProgramItemTypeEnum;


  @ApiProperty({
    description: "Item id",
    example: 43354534,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  itemId?: number;


  @ApiProperty({
    description: "Id of the gym manager",
    example: 43354534,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  managerUserId?: number;

}
