import { ApiProperty } from "@nestjs/swagger";
import { DetailsUserBodyParamDto } from "../details";
import { PaginatedResponseDto } from "@app/common/dto";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class PaginatedDetailsUserBodyParamDto extends PaginatedResponseDto<DetailsUserBodyParamDto> {

  @ApiProperty({
    type: () => DetailsUserBodyParamDto,
    name: 'items',
    isArray: true,
    description: 'List of users body params'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserBodyParamDto)
  items: DetailsUserBodyParamDto[];
}
