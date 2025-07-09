import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentWarningDto } from "../details";

export class PaginatedDetailsContentWarningDto extends PaginatedResponseDto<DetailsContentWarningDto> {
  @ApiProperty({
    type: () => DetailsContentWarningDto,
    title: DetailsContentWarningDto.name,
    isArray: true,
    description: "List of warning content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentWarningDto)
  items: DetailsContentWarningDto[];
}
