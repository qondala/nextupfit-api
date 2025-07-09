import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseNutritionTypeDto } from "../details";


export class PaginatedDetailsBaseNutritionTypeDto extends PaginatedResponseDto<DetailsBaseNutritionTypeDto> {
  @ApiProperty({
    type: () => DetailsBaseNutritionTypeDto,
    isArray: true,
    description: 'List of base nutrition types',
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseNutritionTypeDto)
  items: DetailsBaseNutritionTypeDto[];   
}
