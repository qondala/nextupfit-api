import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramPerSociologyDto } from "../details";

export class PaginatedDetailsProgramPerSociologyDto extends PaginatedResponseDto<DetailsProgramPerSociologyDto> {

  @ApiProperty({
    type: () => DetailsProgramPerSociologyDto,
    name: 'items',
    isArray: true,
    description: 'List of program per sociology'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramPerSociologyDto)
  items: DetailsProgramPerSociologyDto[];
}
