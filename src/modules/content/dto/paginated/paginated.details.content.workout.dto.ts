import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentWorkoutDto } from "../details";

export class PaginatedDetailsContentWorkoutDto extends PaginatedResponseDto<DetailsContentWorkoutDto> {
  @ApiProperty({
    type: () => DetailsContentWorkoutDto,
    title: DetailsContentWorkoutDto.name,
    isArray: true,
    description: "List of workout content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentWorkoutDto)
  items: DetailsContentWorkoutDto[];
}
