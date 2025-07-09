import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsBaseWorkoutDto } from "@app/module/base/dto";


export class DetailsGymManagerSpecializedInWorkoutDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the base workout',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  baseWorkoutId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Created at of the gym manager specialized in workout',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Updated at of the gym manager specialized in workout',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;


  @ApiProperty({
    type: () => DetailsBaseWorkoutDto,
    title: "DetailsBaseWorkoutDto",
    description: 'Base workout of the gym manager specialized in workout',
    required: true,
  })
  @Type(() => DetailsBaseWorkoutDto)
  baseWorkout: DetailsBaseWorkoutDto;
}
