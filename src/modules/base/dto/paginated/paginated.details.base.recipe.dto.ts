import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseRecipeDto } from "../details";

export class PaginatedDetailsBaseRecipeDto extends PaginatedResponseDto<DetailsBaseRecipeDto> {
  @ApiProperty({ type: () => DetailsBaseRecipeDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseRecipeDto)
  items: DetailsBaseRecipeDto[];
}
