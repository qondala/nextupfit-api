import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { BaseConsumptionProgramEnum } from "@app/module/base/types";
import { DetailsContentConsumptionItemDto } from "../details/items";
import { SwaggerType } from "@app/common/types";

export class UpdateContentConsumptionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  contentId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "title",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "description",
    example: "description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "display title",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;

  @ApiProperty({
    enum: BaseConsumptionProgramEnum,
    enumName: "BaseConsumptionProgramEnum",
    description: "consumption type",
    example: BaseConsumptionProgramEnum.nutrition,
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseConsumptionProgramEnum)
  typeConsumption?: BaseConsumptionProgramEnum;

  @ApiProperty({
    type: () => DetailsContentConsumptionItemDto,
    isArray: true,
    description: "Consumption items",
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentConsumptionItemDto)
  items?: DetailsContentConsumptionItemDto[];
}
