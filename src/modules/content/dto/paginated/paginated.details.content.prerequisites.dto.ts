import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentPrerequisitesDto } from "../details";

export class PaginatedDetailsContentPrerequisitesDto extends PaginatedResponseDto<DetailsContentPrerequisitesDto> {
  @ApiProperty({
    type: () => DetailsContentPrerequisitesDto,
    title: DetailsContentPrerequisitesDto.name,
    isArray: true,
    description: "List of prerequisites records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentPrerequisitesDto)
  items: DetailsContentPrerequisitesDto[];
}
