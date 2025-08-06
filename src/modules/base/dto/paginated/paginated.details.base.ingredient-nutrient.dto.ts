import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, ValidateNested } from "class-validator";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsBaseIngredientNutrientDto } from "../details";

export class PaginatedDetailsBaseIngredientNutrientDto extends PaginatedResponseDto<DetailsBaseIngredientNutrientDto> {
  @ApiProperty({
    type: () => DetailsBaseIngredientNutrientDto,
    name: "items",
    isArray: true,
    description: "List of base ingredient nutrients",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseIngredientNutrientDto)
  items: DetailsBaseIngredientNutrientDto[];
}
