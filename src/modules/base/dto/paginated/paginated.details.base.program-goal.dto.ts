import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseProgramGoalDto } from "../details";

export class PaginatedDetailsBaseProgramGoalDto extends PaginatedResponseDto<DetailsBaseProgramGoalDto> {
  @ApiProperty({
    type: () => DetailsBaseProgramGoalDto,
    isArray: true,
    description: "List of program goals",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseProgramGoalDto)
  items: DetailsBaseProgramGoalDto[];
}
