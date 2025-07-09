import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymManagerSpecializedInNutritionDto } from "../details";

export class PaginatedDetailsGymManagerSpecializedInNutritionDto extends PaginatedResponseDto<DetailsGymManagerSpecializedInNutritionDto> {
  @ApiProperty({
    type: () => DetailsGymManagerSpecializedInNutritionDto,
    isArray: true,
    description: "Manager specialized nutrition list",
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerSpecializedInNutritionDto)
  items: DetailsGymManagerSpecializedInNutritionDto[];
}
