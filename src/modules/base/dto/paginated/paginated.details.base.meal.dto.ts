import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseMealDto } from "../details";

export class PaginatedDetailsBaseMealDto extends PaginatedResponseDto<DetailsBaseMealDto> {
  @ApiProperty({ type: () => DetailsBaseMealDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseMealDto)
  items: DetailsBaseMealDto[];
}
