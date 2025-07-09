import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseFoodDto } from "../details";

export class PaginatedDetailsBaseFoodDto extends PaginatedResponseDto<DetailsBaseFoodDto> {
  @ApiProperty({
    type: () => DetailsBaseFoodDto,
    isArray: true,
    description: "List of foods",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseFoodDto)
  items: DetailsBaseFoodDto[];
}
