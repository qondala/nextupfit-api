import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentDto } from "../details";

export class PaginatedDetailsContentDto extends PaginatedResponseDto<DetailsContentDto> {
  @ApiProperty({
    type: () => DetailsContentDto,
    title: DetailsContentDto.name,
    isArray: true,
    description: "List of content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentDto)
  items: DetailsContentDto[];
}
