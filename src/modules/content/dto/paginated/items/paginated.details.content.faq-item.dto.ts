import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentFaqItemDto } from "../../details/items";

export class PaginatedDetailsContentFaqItemDto extends PaginatedResponseDto<DetailsContentFaqItemDto> {
  @ApiProperty({
    type: () => DetailsContentFaqItemDto,
    isArray: true,
    description: "FAQ items",
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentFaqItemDto)
  items: DetailsContentFaqItemDto[];
}
