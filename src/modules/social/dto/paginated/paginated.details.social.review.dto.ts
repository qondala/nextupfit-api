import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsSocialReviewDto } from "../details";


export class PaginatedDetailsSocialReviewDto extends PaginatedResponseDto<DetailsSocialReviewDto> {

  @ApiProperty({
    type: () => DetailsSocialReviewDto,
    name: 'items',
    isArray: true,
    description: 'List of reviews'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsSocialReviewDto)
  items: DetailsSocialReviewDto[];
}
