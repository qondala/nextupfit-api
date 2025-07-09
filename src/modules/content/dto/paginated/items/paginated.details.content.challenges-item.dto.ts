import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentChallengesItemDto } from "../../details/items";

export class PaginatedDetailsContentChallengesItemDto extends PaginatedResponseDto<DetailsContentChallengesItemDto> {
  @ApiProperty({
    type: () => DetailsContentChallengesItemDto,
    isArray: true,
    description: "Challenges items"
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentChallengesItemDto)
  items: DetailsContentChallengesItemDto[];
}
