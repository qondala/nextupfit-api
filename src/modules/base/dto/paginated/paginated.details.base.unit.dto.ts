import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseUnitDto } from "../details";

export class PaginatedDetailsBaseUnitDto extends PaginatedResponseDto<DetailsBaseUnitDto> {
  @ApiProperty({ type: () => DetailsBaseUnitDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseUnitDto)
  items: DetailsBaseUnitDto[];
}
