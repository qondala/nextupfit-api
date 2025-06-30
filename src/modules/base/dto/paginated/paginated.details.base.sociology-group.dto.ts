import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsBaseSociologyGroupDto } from "../details";


export class PaginatedDetailsBaseSociologyGroupDto extends PaginatedResponseDto<DetailsBaseSociologyGroupDto> {
  @ApiProperty({
    type: () => DetailsBaseSociologyGroupDto,
    isArray: true,
    description: 'List of base sociology groups',
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseSociologyGroupDto)
  items: DetailsBaseSociologyGroupDto[];   
}
