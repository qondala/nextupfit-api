import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsUserDto } from "../details";

export class PaginatedDetailsUserDto extends PaginatedResponseDto<DetailsUserDto> {

  @ApiProperty({
    type: () => DetailsUserDto,
    name: 'items',
    isArray: true,
    description: 'List of users'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserDto)
  items: DetailsUserDto[];
}
