import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseBodyParamDto } from "../details";

export class PaginatedDetailsBaseBodyParamDto extends PaginatedResponseDto<DetailsBaseBodyParamDto> {
  @ApiProperty({ type: () => DetailsBaseBodyParamDto, isArray: true, description: "List of base body params", required: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseBodyParamDto)
  items: DetailsBaseBodyParamDto[];
}
