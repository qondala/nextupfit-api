import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { FindOrderByEnum } from "@app/common/dto";

import { ProgramItemTypeEnum } from "../../types";

export class ProgramFindCriteriaPerSociologyDto {
  @ApiProperty({
    name: "itemType",
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
    title: "ProgramItemTypeEnum",
    description: "Item type",
    example: ProgramItemTypeEnum.program,
    required: false,
  })
  @IsOptional()
  itemType?: ProgramItemTypeEnum;

  @ApiProperty({
    name: "itemId",
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  itemId?: number;

  @ApiProperty({
    name: "baseSociologyId",
    type: SwaggerType.INTEGER,
    description: "Id of the sociology",
    example: 3,
    required: false,
  })
  @IsOptional()
  baseSociologyId?: number;

  @ApiProperty({
    name: "baseSociologyIds",
    type: SwaggerType.INTEGER,
    isArray: true,
    description: "Id of the sociology",
    example: [3, 4, 5],
    required: false,
  })
  @IsOptional()
  baseSociologyIds?: number[];

  @ApiProperty({
    name: "orderBy",
    enum: FindOrderByEnum,
    enumName: "FindOrderByEnum",
    description: "The order by for the program managers",
    required: false,
  })
  orderBy?: FindOrderByEnum;
}
