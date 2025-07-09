import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsOptional,
} from "class-validator";
import { SwaggerType } from "@app/common/types";
import { ProgramItemTypeEnum } from "../../types";

export class UpdateProgramPerSociologyDto {

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
    description: "record id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  itemId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the sociology",
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsInt()
  baseSociologyId?: number;
}
