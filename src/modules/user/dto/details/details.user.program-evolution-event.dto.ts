import { ApiProperty } from "@nestjs/swagger";
import { ProgamEvolutionEventTypeEnum, ProgramItemTypeEnum } from "@app/module/program/types";
import { SwaggerType } from "@app/common/types";

export class DetailsUserProgramEvolutionEventDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  id: number;


  @ApiProperty({
    enum: ProgamEvolutionEventTypeEnum,
    enumName: "ProgamEvolutionEventTypeEnum",
    title: "ProgamEvolutionEventTypeEnum",
    description: "Program evolution event type",
    required: true,
  })
  event: ProgamEvolutionEventTypeEnum;


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
    type: SwaggerType.DATE,
    description: "Subscription date",
    required: true,
  })
  subscriptionDate: Date;


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
    type: SwaggerType.DATE,
    description: "Created at",
    required: true,
  })
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.DATE,
    description: "Updated at",
    required: true,
  })
  updatedAt: Date;
}

