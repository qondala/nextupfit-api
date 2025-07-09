import { ApiProperty } from "@nestjs/swagger";
import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsUserScheduleDto } from "../details/details.user.schedule.dto";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


export class PaginatedDetailsUserScheduleDto extends PaginatedResponseDto<DetailsUserScheduleDto> {

  @ApiProperty({
    type: () => DetailsUserScheduleDto,
    name: 'items',
    isArray: true,
    description: 'List of users schedules'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserScheduleDto)
  items: DetailsUserScheduleDto[];
}
