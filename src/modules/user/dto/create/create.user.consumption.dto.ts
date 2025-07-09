import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseConsumptionProgramEnum, BaseTimeFormatEnum } from "@app/module/base/types";

export class CreateUserConsumptionDto {
  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is casual consumption",
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isCasual?: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is regular consumption",
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isRegular?: boolean;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date",
    description: "Day of the consumption",
    example: "2025-05-02",
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  day: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Hour begin (0-23)",
    example: 8,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  hourBegin: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Minute begin (0-59)",
    example: 30,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  minuteBegin: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Hour end (0-23)",
    example: 10,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  hourEnd: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Minute end (0-59)",
    example: 0,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  minuteEnd: number;

  @ApiProperty({
    enum: BaseConsumptionProgramEnum,
    enumName: "BaseConsumptionProgramEnum",
    description: "Type of consumption program",
    example: BaseConsumptionProgramEnum.nutrition,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseConsumptionProgramEnum)
  typeConsumption: BaseConsumptionProgramEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Related content consumption ID",
    example: 12345,
    required: false,
  })
  @IsOptional()
  @IsInt()
  contentConsumptionId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 123,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    enum: BaseTimeFormatEnum,
    enumName: "BaseTimeFormatEnum",
    description: "Time format (12h/24h)",
    example: BaseTimeFormatEnum.OCLOCK,
    default: BaseTimeFormatEnum.OCLOCK,
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseTimeFormatEnum)
  timeFormat?: BaseTimeFormatEnum;
}
