import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentGoalsDto } from "../details";

export class PaginatedDetailsContentGoalsDto extends PaginatedResponseDto<DetailsContentGoalsDto> {
  @ApiProperty({
    type: () => DetailsContentGoalsDto,
    title: DetailsContentGoalsDto.name,
    isArray: true,
    description: "List of goals content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentGoalsDto)
  items: DetailsContentGoalsDto[];
}
