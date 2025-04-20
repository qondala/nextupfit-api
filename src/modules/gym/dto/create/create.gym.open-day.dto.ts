import {
    IsNumber,
    IsOptional,
    IsNotEmpty,
    IsEnum
  } from "class-validator";
  import { ApiProperty } from "@nestjs/swagger";
  
  import { BaseWeekDaysEnum } from "@app/module/base/types";
  
export class CreateGymOpenDayDto {

  @ApiProperty({
    description: "Gym Id",
    example: 45645645,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    description: "Openning day",
    example: BaseWeekDaysEnum.monday,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseWeekDaysEnum)
  day: BaseWeekDaysEnum;


  @ApiProperty({
    description: "Opening hour",
    example: 7,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  hourFrom: number;


  @ApiProperty({
    description: "Opening hour minute",
    example: 30,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  minuteFrom: number;

  @ApiProperty({
    description: "Closing hour",
    example: 22,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  hourTo: number;


  @ApiProperty({
    description: "Closing hour minute",
    example: 30,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  minuteTo: number;
}
  