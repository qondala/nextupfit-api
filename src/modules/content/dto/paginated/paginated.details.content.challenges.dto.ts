import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentChallengesDto } from "../details";

export class PaginatedDetailsContentChallengesDto extends PaginatedResponseDto<DetailsContentChallengesDto> {
  @ApiProperty({
    type: () => DetailsContentChallengesDto,
    title: DetailsContentChallengesDto.name,
    isArray: true,
    description: "List of challenges content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentChallengesDto)
  items: DetailsContentChallengesDto[];
}
