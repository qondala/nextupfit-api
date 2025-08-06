import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, ValidateNested } from "class-validator";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsBaseIngredientDto } from "../details";

export class PaginatedDetailsBaseIngredientDto extends PaginatedResponseDto<DetailsBaseIngredientDto> {
  @ApiProperty({
    type: () => DetailsBaseIngredientDto,
    name: "items",
    isArray: true,
    description: "List of base ingredients",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseIngredientDto)
  items: DetailsBaseIngredientDto[];
}
