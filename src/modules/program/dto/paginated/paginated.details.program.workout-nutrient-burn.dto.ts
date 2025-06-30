import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramWorkoutNutrientBurnDto } from "../details";

export class PaginatedDetailsProgramWorkoutNutrientBurnDto extends PaginatedResponseDto<DetailsProgramWorkoutNutrientBurnDto> {

  @ApiProperty({
    type: () => DetailsProgramWorkoutNutrientBurnDto,
    name: 'items',
    isArray: true,
    description: 'List of program workout nutrient burns'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramWorkoutNutrientBurnDto)
  items: DetailsProgramWorkoutNutrientBurnDto[];
}
