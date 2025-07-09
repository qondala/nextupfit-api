import { ApiProperty } from "@nestjs/swagger";
import { DetailsUserProgramEvolutionEventDto } from "../details";
import { PaginatedResponseDto } from "@app/common/dto";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PaginatedDetailsUserProgramEvolutionEventDto extends PaginatedResponseDto<DetailsUserProgramEvolutionEventDto> {

  @ApiProperty({
    type: () => DetailsUserProgramEvolutionEventDto,
    name: 'items',
    isArray: true,
    description: 'List of users program evolution events'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserProgramEvolutionEventDto)
  items: DetailsUserProgramEvolutionEventDto[];
}

