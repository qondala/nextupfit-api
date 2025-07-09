import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseRecipeInstructionTagDto } from "../details";

export class PaginatedDetailsBaseRecipeInstructionTagDto extends PaginatedResponseDto<DetailsBaseRecipeInstructionTagDto> {
  @ApiProperty({ type: () => DetailsBaseRecipeInstructionTagDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseRecipeInstructionTagDto)
  items: DetailsBaseRecipeInstructionTagDto[];
}
