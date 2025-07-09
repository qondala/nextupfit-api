import { ApiProperty } from "@nestjs/swagger";
import { PaginatedResponseDto } from "@app/common/dto";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { DetailsContentInstructionsDto } from "../details";

export class PaginatedDetailsContentInstructionsDto extends PaginatedResponseDto<DetailsContentInstructionsDto> {
  @ApiProperty({
    type: () => DetailsContentInstructionsDto,
    title: DetailsContentInstructionsDto.name,
    isArray: true,
    description: "List of instruction records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentInstructionsDto)
  items: DetailsContentInstructionsDto[];
}
