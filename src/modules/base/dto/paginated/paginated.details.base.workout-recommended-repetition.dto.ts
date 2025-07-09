import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseWorkoutRecommendedRepetitionDto } from "../details";

export class PaginatedDetailsBaseWorkoutRecommendedRepetitionDto extends PaginatedResponseDto<DetailsBaseWorkoutRecommendedRepetitionDto> {
  @ApiProperty({ type: () => DetailsBaseWorkoutRecommendedRepetitionDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseWorkoutRecommendedRepetitionDto)
  items: DetailsBaseWorkoutRecommendedRepetitionDto[];
}
