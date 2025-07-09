import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsUserConsumptionItemDto } from "../details";

export class PaginatedDetailsUserConsumptionItemDto extends PaginatedResponseDto<DetailsUserConsumptionItemDto> {
  @ApiProperty({ type: () => DetailsUserConsumptionItemDto, isArray: true, description: "List of user consumption items" })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserConsumptionItemDto)
  items: DetailsUserConsumptionItemDto[];
}
