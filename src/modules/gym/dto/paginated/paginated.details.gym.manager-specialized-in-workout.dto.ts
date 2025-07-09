import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymManagerSpecializedInWorkoutDto } from "../details";


export class PaginatedDetailsGymManagerSpecializedInWorkoutDto extends PaginatedResponseDto<DetailsGymManagerSpecializedInWorkoutDto> {

  @ApiProperty({
    type: () => DetailsGymManagerSpecializedInWorkoutDto,
    name: 'items',
    isArray: true,
    description: 'List of gym managers specialized in workout'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerSpecializedInWorkoutDto)
  items: DetailsGymManagerSpecializedInWorkoutDto[];
}
