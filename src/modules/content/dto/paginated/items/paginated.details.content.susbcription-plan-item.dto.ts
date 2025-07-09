import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentSusbcriptionPlanItemDto } from "../../details/items";

export class PaginatedDetailsContentSusbcriptionPlanItemDto extends PaginatedResponseDto<DetailsContentSusbcriptionPlanItemDto> {
  @ApiProperty({
    type: () => DetailsContentSusbcriptionPlanItemDto,
    isArray: true,
    description: "Subscription plan items",
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentSusbcriptionPlanItemDto)
  items: DetailsContentSusbcriptionPlanItemDto[];
}
