import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseFoodGroupDto } from "../details";

export class PaginatedDetailsBaseFoodGroupDto extends PaginatedResponseDto<DetailsBaseFoodGroupDto> {
  @ApiProperty({
    type: () => DetailsBaseFoodGroupDto,
    isArray: true,
    description: "List of base food groups",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseFoodGroupDto)
  items: DetailsBaseFoodGroupDto[];
}
