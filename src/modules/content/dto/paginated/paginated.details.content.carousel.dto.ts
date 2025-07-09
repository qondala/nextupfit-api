import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentCarouselDto } from "../details";

export class PaginatedDetailsContentCarouselDto extends PaginatedResponseDto<DetailsContentCarouselDto> {
  @ApiProperty({
    type: () => DetailsContentCarouselDto,
    title: DetailsContentCarouselDto.name,
    isArray: true,
    description: "List of carousel content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentCarouselDto)
  items: DetailsContentCarouselDto[];
}
