import {
  IsInt,
  IsOptional,
  IsEnum
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseWeekDaysEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";
  
export class UpdateGymOpenDayDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym Id",
    example: 45645645,
    required: false,
  })
  @IsOptional()
  @IsInt()
  gymId?: number;


  @ApiProperty({
    enum: BaseWeekDaysEnum,
    enumName: "BaseWeekDaysEnum",
    description: "Openning day",
    example: BaseWeekDaysEnum.monday,
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseWeekDaysEnum)
  day?: BaseWeekDaysEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Opening hour",
    example: 7,
    required: false,
  })
  @IsOptional()
  @IsInt()
  hourFrom?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Opening hour minute",
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsInt()
  minuteFrom?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Closing hour",
    example: 22,
    required: false,
  })
  @IsOptional()
  @IsInt()
  hourTo?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Closing hour minute",
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsInt()
  minuteTo?: number;
}
  
