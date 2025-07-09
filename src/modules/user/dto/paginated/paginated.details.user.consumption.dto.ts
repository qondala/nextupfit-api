import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsUserConsumptionDto } from "../details";

export class PaginatedDetailsUserConsumptionDto extends PaginatedResponseDto<DetailsUserConsumptionDto> {
  @ApiProperty({
    type: () => DetailsUserConsumptionDto,
    name: 'items',
    isArray: true,
    description: "List of user consumptions"
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserConsumptionDto)
  items: DetailsUserConsumptionDto[];
}
