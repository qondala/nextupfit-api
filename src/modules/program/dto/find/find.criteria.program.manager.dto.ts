import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { FindOrderByEnum } from "@app/common/dto";

import { ProgramItemTypeEnum } from "../../types";


export class ProgramFindCriteriaManagerDto {

  @ApiProperty({
    name: 'itemType',
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
    name: 'itemId',
    type: SwaggerType.INTEGER,
    description: "Item id",
    example: 43354534,
    required: false,
  })
  @IsOptional()
  @IsInt()
  itemId?: number;


  @ApiProperty({
    name: 'managerUserId',
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager",
    example: 4335,
    required: false,
  })
  @IsInt()
  @IsOptional()
  managerUserId?: number;

  @ApiProperty({
    name: 'managerId',
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager",
    example: 4335,
    required: false,
  })
  @IsInt()
  @IsOptional()
  managerId?: number;

  @ApiProperty({
    name: 'gymId',
    type: SwaggerType.INTEGER,
    description: "ID of the gym",
    example: 4335,
    required: false,
  })
  @IsInt()
  @IsOptional()
  gymId?: number;

  @ApiProperty({
    name: 'orderBy',
    enum: FindOrderByEnum,
    enumName: "FindOrderByEnum",
    description: 'The order by for the program managers',
    required: false,
  })
  orderBy?: FindOrderByEnum;
}
