import { ApiProperty } from "@nestjs/swagger";
import { DetailsUserRecommendationDto } from "../details";
import { PaginatedResponseDto } from "@app/common/dto";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PaginatedDetailsUserRecommendationDto extends PaginatedResponseDto<DetailsUserRecommendationDto> {

  @ApiProperty({
    type: () => DetailsUserRecommendationDto,
    name: 'items',
    isArray: true,
    description: 'List of users recommendations'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserRecommendationDto)
  items: DetailsUserRecommendationDto[];
}
