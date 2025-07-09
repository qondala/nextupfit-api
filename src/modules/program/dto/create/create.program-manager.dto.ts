import { ApiProperty } from "@nestjs/swagger";

import { ProgramItemTypeEnum } from "../../types";
import { IsNotEmpty, IsNumber, IsEnum } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class CreateProgramManagerDto {

  @ApiProperty({
    enumName: "ProgramItemTypeEnum",
    enum: ProgramItemTypeEnum,
    description: "Item type",
    example: ProgramItemTypeEnum.program,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ProgramItemTypeEnum)
  itemType: ProgramItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    example: 43354534,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  itemId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager",
    example: 43354534,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;
}
