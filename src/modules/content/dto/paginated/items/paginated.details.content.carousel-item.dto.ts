import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentCarouselItemDto } from "../../details/items";

export class PaginatedDetailsContentCarouselItemDto extends PaginatedResponseDto<DetailsContentCarouselItemDto> {
  @ApiProperty({
    type: () => DetailsContentCarouselItemDto,
    isArray: true,
    description: "Carousel items"
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentCarouselItemDto)
  items: DetailsContentCarouselItemDto[];
}
