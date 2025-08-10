import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseEquipmentDto } from "../details";

export class PaginatedDetailsBaseEquipmentDto extends PaginatedResponseDto<DetailsBaseEquipmentDto> {
  @ApiProperty({
    type: () => DetailsBaseEquipmentDto,
    isArray: true,
    description: "List of equipment",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseEquipmentDto)
  items: DetailsBaseEquipmentDto[];
}
