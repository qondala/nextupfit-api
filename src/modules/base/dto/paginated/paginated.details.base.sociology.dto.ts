import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseSociologyDto } from "../details";


export class PaginatedDetailsBaseSociologyDto extends PaginatedResponseDto<DetailsBaseSociologyDto> {
  @ApiProperty({
    type: () => DetailsBaseSociologyDto,
    isArray: true,
    description: 'List of base sociologies',
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseSociologyDto)
  items: DetailsBaseSociologyDto[];   
}
