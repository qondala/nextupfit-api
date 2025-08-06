import { ApiProperty } from "@nestjs/swagger";
import {
  ProgramItemCompositeDto,
  ProgramItemTypeEnum,
} from "@app/module/program/types";
import { Type } from "class-transformer";

import { DetailsGymDto, DetailsGymManagerDto } from "./";

export class DetailsGymHasProgramDto {
  @ApiProperty({
    description: "The unique identifier of the gym has program record",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "The ID of the gym",
    example: 1,
  })
  gymId: number;

  @ApiProperty({
    description: "The type of program item",
    enum: ProgramItemTypeEnum,
    example: ProgramItemTypeEnum.program,
  })
  itemType: ProgramItemTypeEnum;

  @ApiProperty({
    description: "The ID of the program item",
    example: 1,
  })
  itemId: number;

  @ApiProperty({
    description: "The ID of the owner manager",
    example: 1,
  })
  owerManagerId: number;

  @ApiProperty({
    description: "The creation timestamp",
    example: "2023-01-01T00:00:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: "Gym of the gym has program",
    required: true,
  })
  @Type(() => DetailsGymDto)
  gym: DetailsGymDto;

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    title: "DetailsGymManagerDto",
    description: "Manager of the gym has program",
    required: true,
  })
  @Type(() => DetailsGymManagerDto)
  manager: DetailsGymManagerDto;

  @ApiProperty({
    type: () => ProgramItemCompositeDto,
    title: "ProgramItemCompositeDto",
    description: "Program item of the gym has program",
    required: true,
  })
  @Type(() => ProgramItemCompositeDto)
  item: ProgramItemCompositeDto;
}
