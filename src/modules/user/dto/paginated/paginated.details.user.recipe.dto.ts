import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsUserRecipeDto } from "../details";

export class PaginatedDetailsUserRecipeDto extends PaginatedResponseDto<DetailsUserRecipeDto> {
  @ApiProperty({
    type: () => DetailsUserRecipeDto,
    name: 'items',
    isArray: true,
    description: 'List of users recipes'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserRecipeDto)
  items: DetailsUserRecipeDto[];
}
