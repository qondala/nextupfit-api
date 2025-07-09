import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseNutritionDto } from "../details";

export class PaginatedDetailsBaseNutritionDto extends PaginatedResponseDto<DetailsBaseNutritionDto> {
  @ApiProperty({
    type: () => DetailsBaseNutritionDto,
    isArray: true,
    description: "List of base nutritions",
    required: true
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseNutritionDto)
  items: DetailsBaseNutritionDto[];
}
