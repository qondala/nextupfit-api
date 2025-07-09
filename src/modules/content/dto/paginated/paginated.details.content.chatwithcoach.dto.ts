import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentChatWithCoachDto } from "../details";

export class PaginatedDetailsContentChatWithCoachDto extends PaginatedResponseDto<DetailsContentChatWithCoachDto> {
  @ApiProperty({
    type: () => DetailsContentChatWithCoachDto,
    title: DetailsContentChatWithCoachDto.name,
    isArray: true,
    description: "List of chat with coach content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentChatWithCoachDto)
  items: DetailsContentChatWithCoachDto[];
}
