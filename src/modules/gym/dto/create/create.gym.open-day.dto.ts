import {
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsEnum
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseWeekDaysEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";
  
export class CreateGymOpenDayDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym Id",
    example: 45645645,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gymId: number;


  @ApiProperty({
    enum: BaseWeekDaysEnum,
    enumName: "BaseWeekDaysEnum",
    description: "Openning day",
    example: BaseWeekDaysEnum.monday,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseWeekDaysEnum)
  day: BaseWeekDaysEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Opening hour",
    example: 7,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  hourFrom: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Opening hour minute",
    example: 30,
    required: true,
  })
  @IsOptional()
  @IsInt()
  minuteFrom: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Closing hour",
    example: 22,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  hourTo: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Closing hour minute",
    example: 30,
    required: true,
  })
  @IsOptional()
  @IsInt()
  minuteTo: number;
}
  