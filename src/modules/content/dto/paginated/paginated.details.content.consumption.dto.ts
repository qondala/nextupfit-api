import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentConsumptionDto } from "../details";

export class PaginatedDetailsContentConsumptionDto extends PaginatedResponseDto<DetailsContentConsumptionDto> {
  @ApiProperty({
    type: () => DetailsContentConsumptionDto,
    title: DetailsContentConsumptionDto.name,
    isArray: true,
    description: "List of consumption content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentConsumptionDto)
  items: DetailsContentConsumptionDto[];
}
