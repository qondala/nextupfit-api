import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentImageDto } from "../details/details.content.image.dto";

export class PaginatedDetailsContentImageDto extends PaginatedResponseDto<DetailsContentImageDto> {
  @ApiProperty({
    type: () => DetailsContentImageDto,
    title: DetailsContentImageDto.name,
    isArray: true,
    description: "List of content image records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentImageDto)
  items: DetailsContentImageDto[];
}
