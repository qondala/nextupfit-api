import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentGalleryItemDto } from "../../details/items";

export class PaginatedDetailsContentGalleryItemDto extends PaginatedResponseDto<DetailsContentGalleryItemDto> {
  @ApiProperty({
    type: () => DetailsContentGalleryItemDto,
    isArray: true,
    description: "Gallery items",
    required: true
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentGalleryItemDto)
  items: DetailsContentGalleryItemDto[];
}
