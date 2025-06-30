import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramStepActivityWorkingsessionWorkoutDto } from "../details";

export class PaginatedDetailsProgramStepActivityWorkingsessionWorkoutDto extends PaginatedResponseDto<DetailsProgramStepActivityWorkingsessionWorkoutDto> {

  @ApiProperty({
    type: () => DetailsProgramStepActivityWorkingsessionWorkoutDto,
    name: 'items',
    isArray: true,
    description: 'List of program step activity workout sessions workouts'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramStepActivityWorkingsessionWorkoutDto)
  items: DetailsProgramStepActivityWorkingsessionWorkoutDto[];
}
