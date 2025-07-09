import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseMealFoodDto } from "../details";

export class PaginatedDetailsBaseMealFoodDto extends PaginatedResponseDto<DetailsBaseMealFoodDto> {
  @ApiProperty({
    type: () => DetailsBaseMealFoodDto,
    isArray: true,
    description: "List of meal foods",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseMealFoodDto)
  items: DetailsBaseMealFoodDto[];
}
