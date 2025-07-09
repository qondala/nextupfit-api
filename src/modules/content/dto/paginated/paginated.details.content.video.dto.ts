import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentVideoDto } from "../details";

export class PaginatedDetailsContentVideoDto extends PaginatedResponseDto<DetailsContentVideoDto> {
  @ApiProperty({
    type: () => DetailsContentVideoDto,
    title: DetailsContentVideoDto.name,
    isArray: true,
    description: "List of video content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentVideoDto)
  items: DetailsContentVideoDto[];
}
