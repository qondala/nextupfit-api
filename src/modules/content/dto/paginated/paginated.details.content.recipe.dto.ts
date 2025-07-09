import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentRecipeDto } from "../details";

export class PaginatedDetailsContentRecipeDto extends PaginatedResponseDto<DetailsContentRecipeDto> {
  @ApiProperty({
    type: () => DetailsContentRecipeDto,
    title: DetailsContentRecipeDto.name,
    isArray: true,
    description: "List of recipe records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentRecipeDto)
  items: DetailsContentRecipeDto[];
}
