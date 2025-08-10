import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseWorkoutMuscleDto } from "../details";

export class PaginatedDetailsBaseWorkoutMuscleDto extends PaginatedResponseDto<DetailsBaseWorkoutMuscleDto> {
  @ApiProperty({
    type: () => DetailsBaseWorkoutMuscleDto,
    isArray: true,
    description: "List of workout muscles",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseWorkoutMuscleDto)
  items: DetailsBaseWorkoutMuscleDto[];
}
