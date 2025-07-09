import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentAccordionDto } from "../details";

export class PaginatedDetailsContentAccordionDto extends PaginatedResponseDto<DetailsContentAccordionDto> {
  @ApiProperty({
    type: () => DetailsContentAccordionDto,
    title: DetailsContentAccordionDto.name,
    isArray: true,
    description: "List of accordion content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentAccordionDto)
  items: DetailsContentAccordionDto[];
}
