import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
} from "class-validator";
import { SwaggerType } from "@app/common/types";
import { ProgramItemTypeEnum } from "../../types";

export class CreateProgramPerSociologyDto {

  @ApiProperty({
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
    title: "ProgramItemTypeEnum",
    description: "Item type",
    example: ProgramItemTypeEnum.program,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ProgramItemTypeEnum)
  itemType: ProgramItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  itemId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the sociology",
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  baseSociologyId: number;
}
