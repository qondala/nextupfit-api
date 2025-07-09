import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentEquipmentItemDto } from "../../details";

export class PaginatedDetailsContentEquipmentItemDto extends PaginatedResponseDto<DetailsContentEquipmentItemDto> {
  @ApiProperty({
    type: () => DetailsContentEquipmentItemDto,
    title: DetailsContentEquipmentItemDto.name,
    isArray: true,
    description: "List of equipment item records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentEquipmentItemDto)
  items: DetailsContentEquipmentItemDto[];
}
