import { ApiProperty } from "@nestjs/swagger";

import { DetailsUserBookmarkAndFavoriteDto } from "../details";
import { PaginatedResponseDto } from "@app/common/dto";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PaginatedDetailsUserBookmarkAndFavoriteDto extends PaginatedResponseDto<DetailsUserBookmarkAndFavoriteDto> {

  @ApiProperty({
    type: () => DetailsUserBookmarkAndFavoriteDto,
    name: 'items',
    isArray: true,
    description: 'List of users bookmark and favorite'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserBookmarkAndFavoriteDto)
  items: DetailsUserBookmarkAndFavoriteDto[];
}
