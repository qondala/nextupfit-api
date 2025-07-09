import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentGalleryDto } from "../details";


export class PaginatedDetailsContentGalleryDto extends PaginatedResponseDto<DetailsContentGalleryDto> {
  @ApiProperty({
    type: () => DetailsContentGalleryDto,
    description: "Content galleries list",
    isArray: true,
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentGalleryDto)
  items: DetailsContentGalleryDto[];
}
