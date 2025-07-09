import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentSusbcriptionPlanDto } from "../details";

export class PaginatedDetailsContentSusbcriptionPlanDto extends PaginatedResponseDto<DetailsContentSusbcriptionPlanDto> {
  @ApiProperty({
    type: () => DetailsContentSusbcriptionPlanDto,
    title: DetailsContentSusbcriptionPlanDto.name,
    isArray: true,
    description: "List of content subscription plans",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentSusbcriptionPlanDto)
  items: DetailsContentSusbcriptionPlanDto[];
}
