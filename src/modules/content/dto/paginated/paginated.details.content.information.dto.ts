import { ApiProperty } from "@nestjs/swagger";
import { PaginatedResponseDto } from "@app/common/dto";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { DetailsContentInformationDto } from "../details";

export class PaginatedDetailsContentInformationDto extends PaginatedResponseDto<DetailsContentInformationDto> {
  @ApiProperty({
    type: () => DetailsContentInformationDto,
    title: DetailsContentInformationDto.name,
    isArray: true,
    description: "List of information records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentInformationDto)
  items: DetailsContentInformationDto[];
}
