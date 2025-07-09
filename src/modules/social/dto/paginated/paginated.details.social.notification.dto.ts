import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsSocialNotificationDto } from "../details";

export class PaginatedDetailsSocialNotificationDto extends PaginatedResponseDto<DetailsSocialNotificationDto> {
  @ApiProperty({
    type: () => DetailsSocialNotificationDto,
    name: "items",
    isArray: true,
    description: "List of social notifications",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsSocialNotificationDto)
  items: DetailsSocialNotificationDto[];
}
