import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsBaseSociologyDto } from "@app/module/base/dto";

import { ProgramItemCompositeDto, ProgramItemTypeEnum } from "../../types";

export class DetailsProgramPerSociologyDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

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

  @ApiProperty({
    type: () => DetailsBaseSociologyDto,
    description: "Sociology",
    required: true,
  })
  @Type(() => DetailsBaseSociologyDto)
  @ValidateNested()
  sociology: DetailsBaseSociologyDto;

  @ApiProperty({
    type: () => ProgramItemCompositeDto,
    title: "ProgramItemCompositeDto",
    description: "Program item of the gym has program",
    required: true,
  })
  @Type(() => ProgramItemCompositeDto)
  item: ProgramItemCompositeDto;
}
