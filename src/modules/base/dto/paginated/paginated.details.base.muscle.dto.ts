import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseMuscleDto } from "../details";

export class PaginatedDetailsBaseMuscleDto extends PaginatedResponseDto<DetailsBaseMuscleDto> {
  @ApiProperty({ type: () => DetailsBaseMuscleDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseMuscleDto)
  items: DetailsBaseMuscleDto[];
}
