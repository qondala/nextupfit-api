import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentCommitmentDto } from "../details";

export class PaginatedDetailsContentCommitmentDto extends PaginatedResponseDto<DetailsContentCommitmentDto> {
  @ApiProperty({
    type: () => DetailsContentCommitmentDto,
    title: DetailsContentCommitmentDto.name,
    isArray: true,
    description: "List of commitment content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentCommitmentDto)
  items: DetailsContentCommitmentDto[];
}
