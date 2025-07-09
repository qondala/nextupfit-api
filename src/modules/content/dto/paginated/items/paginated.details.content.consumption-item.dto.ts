import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentConsumptionItemDto } from "../../details/items";

export class PaginatedDetailsContentConsumptionItemDto extends PaginatedResponseDto<DetailsContentConsumptionItemDto> {
  @ApiProperty({
    type: () => DetailsContentConsumptionItemDto,
    isArray: true,
    description: "Consumption items"
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentConsumptionItemDto)
  items: DetailsContentConsumptionItemDto[];
}
