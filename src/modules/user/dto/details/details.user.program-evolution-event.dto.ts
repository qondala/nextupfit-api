import { ApiProperty } from "@nestjs/swagger";
import {
  ProgramEvolutionEventTypeEnum,
  ProgramItemTypeEnum
} from "@app/module/program/types";
import { SwaggerType } from "@app/common/types";

export class DetailsUserProgramEvolutionEventDto {


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  id: number;


  @ApiProperty({
    enum: ProgramEvolutionEventTypeEnum,
    enumName: "ProgramEvolutionEventTypeEnum",
    title: "ProgramEvolutionEventTypeEnum",
    description: "Program evolution event type",
    required: true,
  })
  event: ProgramEvolutionEventTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    required: true,
  })
  userId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    required: true,
  })
  gymId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program item id",
    required: true,
  })
  programItemId: number;


  @ApiProperty({
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
    title: "ProgramItemTypeEnum",
    description: "Program item type",
    required: true,
  })
  programItem: ProgramItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Progression points",
    required: true,
  })
  progressionPoints: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Progression percentage",
    required: true,
  })
  progressionPercentage: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Total progression percentage",
    required: true,
  })
  totalProgressionPercentage: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Total progression points",
    required: true,
  })
  totalProgressionPoints: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Quantity",
    required: true,
  })
  quantity: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Iteration",
    required: true,
  })
  iteration: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Created at",
    required: true,
  })
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Updated at",
    required: true,
  })
  updatedAt: Date;
}

