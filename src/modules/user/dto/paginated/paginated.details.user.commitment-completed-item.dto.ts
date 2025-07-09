import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsUserCommitmentCompletedItemDto } from "../details";



export class PaginatedDetailsUserCommitmentCompletedItemDto extends PaginatedResponseDto<DetailsUserCommitmentCompletedItemDto> {
  @ApiProperty({
    type: () => DetailsUserCommitmentCompletedItemDto,
    isArray: true,
    description: "List of user completed commitment items",
    required: true
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserCommitmentCompletedItemDto)
  items: DetailsUserCommitmentCompletedItemDto[];
}

