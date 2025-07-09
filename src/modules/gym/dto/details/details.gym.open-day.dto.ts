import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum
} from 'class-validator';
import { Type } from 'class-transformer';

import { SwaggerType } from '@app/common/types';
import { BaseWeekDaysEnum } from "@app/module/base/types";


export class DetailsGymOpenDayDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym open day',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    enum: BaseWeekDaysEnum,
    enumName: 'BaseWeekDaysEnum',
    title: 'BaseWeekDaysEnum',
    description: 'Day of the gym open day',
    example: BaseWeekDaysEnum.monday,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseWeekDaysEnum)
  day: BaseWeekDaysEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Hour from of the gym open day',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  hourFrom: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Minute from of the gym open day',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  minuteFrom: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Hour to of the gym open day',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  hourTo: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Minute to of the gym open day',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  minuteTo: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Created at of the gym open day',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Updated at of the gym open day',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
