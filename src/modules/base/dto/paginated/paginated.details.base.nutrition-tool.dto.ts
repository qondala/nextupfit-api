import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseNutritionToolDto } from "../details";

export class PaginatedDetailsBaseNutritionToolDto extends PaginatedResponseDto<DetailsBaseNutritionToolDto> {
  @ApiProperty({
    type: () => DetailsBaseNutritionToolDto,
    isArray: true,
    description: "List of nutrition tools",
    required: true
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseNutritionToolDto)
  items: DetailsBaseNutritionToolDto[];
}
