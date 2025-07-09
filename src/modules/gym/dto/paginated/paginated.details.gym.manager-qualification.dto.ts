import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymManagerQualificationDto } from "../details";

export class PaginatedDetailsGymManagerQualificationDto extends PaginatedResponseDto<DetailsGymManagerQualificationDto> {
  @ApiProperty({
    type: () => DetailsGymManagerQualificationDto,
    isArray: true,
    description: "List of gym manager qualifications",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerQualificationDto)
  items: DetailsGymManagerQualificationDto[];
}
