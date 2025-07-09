import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentOrderedlistDto } from "../details";

export class PaginatedDetailsContentOrderedlistDto extends PaginatedResponseDto<DetailsContentOrderedlistDto> {
  @ApiProperty({
    type: () => DetailsContentOrderedlistDto,
    title: DetailsContentOrderedlistDto.name,
    isArray: true,
    description: "List of ordered list records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentOrderedlistDto)
  items: DetailsContentOrderedlistDto[];
}
