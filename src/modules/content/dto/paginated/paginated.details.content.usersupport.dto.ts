import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentUsersupportDto } from "../details";

export class PaginatedDetailsContentUsersupportDto extends PaginatedResponseDto<DetailsContentUsersupportDto> {
  @ApiProperty({
    type: () => DetailsContentUsersupportDto,
    title: DetailsContentUsersupportDto.name,
    isArray: true,
    description: "List of usersupport content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentUsersupportDto)
  items: DetailsContentUsersupportDto[];
}
