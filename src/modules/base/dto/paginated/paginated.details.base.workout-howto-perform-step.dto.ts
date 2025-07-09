import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseWorkoutHowtoPerformStepDto } from "../details";

export class PaginatedDetailsBaseWorkoutHowtoPerformStepDto extends PaginatedResponseDto<DetailsBaseWorkoutHowtoPerformStepDto> {
  @ApiProperty({ type: () => DetailsBaseWorkoutHowtoPerformStepDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseWorkoutHowtoPerformStepDto)
  items: DetailsBaseWorkoutHowtoPerformStepDto[];
}
