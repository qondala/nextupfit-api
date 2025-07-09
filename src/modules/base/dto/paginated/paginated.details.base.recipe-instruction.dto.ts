import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseRecipeInstructionDto } from "../details";

export class PaginatedDetailsBaseRecipeInstructionDto extends PaginatedResponseDto<DetailsBaseRecipeInstructionDto> {
  @ApiProperty({ type: () => DetailsBaseRecipeInstructionDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseRecipeInstructionDto)
  items: DetailsBaseRecipeInstructionDto[];
}
