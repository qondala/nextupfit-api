import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseWorkoutEquipmentDto } from "../details";

export class PaginatedDetailsBaseWorkoutEquipmentDto extends PaginatedResponseDto<DetailsBaseWorkoutEquipmentDto> {
  @ApiProperty({
    type: () => DetailsBaseWorkoutEquipmentDto,
    isArray: true,
    description: "List of workout equipment",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseWorkoutEquipmentDto)
  items: DetailsBaseWorkoutEquipmentDto[];
}
