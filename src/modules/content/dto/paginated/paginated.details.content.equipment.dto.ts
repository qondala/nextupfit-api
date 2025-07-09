import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentEquipmentDto } from "../details";

export class PaginatedDetailsContentEquipmentDto extends PaginatedResponseDto<DetailsContentEquipmentDto> {
  @ApiProperty({
    type: () => DetailsContentEquipmentDto,
    title: DetailsContentEquipmentDto.name,
    isArray: true,
    description: "List of equipment records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentEquipmentDto)
  items: DetailsContentEquipmentDto[];
}
