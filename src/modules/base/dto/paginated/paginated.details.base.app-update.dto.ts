import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseAppUpdateDto } from "../details";

export class PaginatedDetailsBaseAppUpdateDto extends PaginatedResponseDto<DetailsBaseAppUpdateDto> {
  @ApiProperty({
    type: () => DetailsBaseAppUpdateDto,
    isArray: true,
    description: "List of app updates",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseAppUpdateDto)
  items: DetailsBaseAppUpdateDto[];
}
