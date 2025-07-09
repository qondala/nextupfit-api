import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymSpecializedInWorkoutDto } from "../details";

export class PaginatedDetailsGymSpecializedInWorkoutDto extends PaginatedResponseDto<DetailsGymSpecializedInWorkoutDto> {
  @ApiProperty({
    type: () => DetailsGymSpecializedInWorkoutDto,
    isArray: true,
    description: "List of gym specialized in workout records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymSpecializedInWorkoutDto)
  items: DetailsGymSpecializedInWorkoutDto[];
}
