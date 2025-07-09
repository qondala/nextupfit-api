import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentFaqDto } from "../details";

export class PaginatedDetailsContentFaqDto extends PaginatedResponseDto<DetailsContentFaqDto> {
  @ApiProperty({
    type: () => DetailsContentFaqDto,
    title: DetailsContentFaqDto.name,
    isArray: true,
    description: "List of FAQ blocks",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentFaqDto)
  items: DetailsContentFaqDto[];
}
