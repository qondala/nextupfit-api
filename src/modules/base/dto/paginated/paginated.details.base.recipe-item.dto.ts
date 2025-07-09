import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseRecipeItemDto } from "../details";

export class PaginatedDetailsBaseRecipeItemDto extends PaginatedResponseDto<DetailsBaseRecipeItemDto> {
  @ApiProperty({ type: () => DetailsBaseRecipeItemDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseRecipeItemDto)
  items: DetailsBaseRecipeItemDto[];
}
