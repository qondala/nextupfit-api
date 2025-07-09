import { ApiProperty } from "@nestjs/swagger";
import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymSpecializedInNutritionDto } from "../details";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PaginatedDetailsGymSpecializedInNutritionDto extends PaginatedResponseDto<DetailsGymSpecializedInNutritionDto> {
  @ApiProperty({
    type: () => DetailsGymSpecializedInNutritionDto,
    name: 'items',
    isArray: true,
    description: 'List of gyms specialized in nutrition'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymSpecializedInNutritionDto)
  items: DetailsGymSpecializedInNutritionDto[];
}
