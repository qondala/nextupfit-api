import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentCommitmentItemDto } from "../../details/items";

export class PaginatedDetailsContentCommitmentItemDto extends PaginatedResponseDto<DetailsContentCommitmentItemDto> {
  @ApiProperty({
    type: () => DetailsContentCommitmentItemDto,
    isArray: true,
    description: "Commitment items"
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentCommitmentItemDto)
  items: DetailsContentCommitmentItemDto[];
}
