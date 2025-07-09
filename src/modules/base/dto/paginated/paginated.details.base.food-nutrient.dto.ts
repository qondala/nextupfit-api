import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseFoodNutrientDto } from "../details";

export class PaginatedDetailsBaseFoodNutrientDto extends PaginatedResponseDto<DetailsBaseFoodNutrientDto> {
  @ApiProperty({ type: () => DetailsBaseFoodNutrientDto, isArray: true, description: "Items list" })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseFoodNutrientDto)
  items: DetailsBaseFoodNutrientDto[];
}
