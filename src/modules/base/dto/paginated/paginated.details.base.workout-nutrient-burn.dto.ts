import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseWorkoutNutrientBurnDto } from "../details";

export class PaginatedDetailsBaseWorkoutNutrientBurnDto extends PaginatedResponseDto<DetailsBaseWorkoutNutrientBurnDto> {
  @ApiProperty({ type: () => DetailsBaseWorkoutNutrientBurnDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseWorkoutNutrientBurnDto)
  items: DetailsBaseWorkoutNutrientBurnDto[];
}
