import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseWorkoutDto } from "../details";

export class PaginatedDetailsBaseWorkoutDto extends PaginatedResponseDto<DetailsBaseWorkoutDto> {
  @ApiProperty({
    type: () => DetailsBaseWorkoutDto,
    isArray: true,
    description: 'List of base workouts',
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseWorkoutDto)
  items: DetailsBaseWorkoutDto[];   
}
