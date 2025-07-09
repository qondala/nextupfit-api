import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsEnum } from "class-validator";
import { SwaggerType } from "@app/common/types";
import { ProgramItemTypeEnum } from "../../types";

export class DetailsProgramManagerDto {

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
    description: "Item id",
    example: 43354534,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  itemId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager id",
    example: 43354534,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerId: number;
}
