import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentAccordionItemDto } from "../../details/items";

export class PaginatedDetailsContentAccordionItemDto extends PaginatedResponseDto<DetailsContentAccordionItemDto> {
  @ApiProperty({
    type: () => DetailsContentAccordionItemDto,
    isArray: true,
    description: "Accordion items"
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentAccordionItemDto)
  items: DetailsContentAccordionItemDto[];
}
