import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsUserInterestDto } from "../details";

export class PaginatedDetailsUserInterestDto extends PaginatedResponseDto<DetailsUserInterestDto> {

  @ApiProperty({
    type: () => DetailsUserInterestDto,
    isArray: true,
    description: "List of user interests"
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserInterestDto)
  items: DetailsUserInterestDto[];
}
