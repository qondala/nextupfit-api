import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseNutrientDto } from "../details";

export class PaginatedDetailsBaseNutrientDto extends PaginatedResponseDto<DetailsBaseNutrientDto> {
  @ApiProperty({
    type: () => DetailsBaseNutrientDto,
    isArray: true,
    description: "List of nutrients",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseNutrientDto)
  items: DetailsBaseNutrientDto[];
}
