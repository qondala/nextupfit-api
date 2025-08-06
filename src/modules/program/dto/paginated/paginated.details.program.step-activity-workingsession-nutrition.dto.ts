import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, ValidateNested } from "class-validator";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsProgramStepActivityWorkingsessionNutritionDto } from "../details";

export class PaginatedDetailsProgramStepActivityWorkingsessionNutritionDto extends PaginatedResponseDto<DetailsProgramStepActivityWorkingsessionNutritionDto> {
  @ApiProperty({
    type: () => DetailsProgramStepActivityWorkingsessionNutritionDto,
    name: "items",
    isArray: true,
    description: "List of program nutrition",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramStepActivityWorkingsessionNutritionDto)
  items: DetailsProgramStepActivityWorkingsessionNutritionDto[];
}
