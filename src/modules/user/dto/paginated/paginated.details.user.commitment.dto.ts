import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsUserCommitmentDto } from "../details";

export class PaginatedDetailsUserCommitmentDto extends PaginatedResponseDto<DetailsUserCommitmentDto> {
  @ApiProperty({
    type: () => DetailsUserCommitmentDto,
    isArray: true,
    description: "List of user commitments",
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserCommitmentDto)
  items: DetailsUserCommitmentDto[];
}
