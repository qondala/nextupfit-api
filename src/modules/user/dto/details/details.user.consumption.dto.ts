import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { BaseConsumptionProgramEnum, BaseTimeFormatEnum } from "@app/module/base/types";

export class DetailsUserConsumptionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record id"
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is casual"
  })
  isCasual: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is regular"
  })
  isRegular: boolean;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date",
    description: "Day of consumption"
  })
  day: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Hour begin"
  })
  hourBegin: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Minute begin"
  })
  minuteBegin: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Hour end"
  })
  hourEnd: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Minute end"
  })
  minuteEnd: number;

  @ApiProperty({
    enum: BaseTimeFormatEnum,
    enumName: "BaseTimeFormatEnum",
    description: "Time format"
  })
  timeFormat: BaseTimeFormatEnum;

  @ApiProperty({
    enum: BaseConsumptionProgramEnum,
    enumName: "BaseConsumptionProgramEnum",
    description: "Type of consumption"
  })
  typeConsumption: BaseConsumptionProgramEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content consumption id",
    required: false
  })
  contentConsumptionId?: number;

  
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id"
  })
  userId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Created at"
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Updated at"
  })
  updatedAt: Date;
}
