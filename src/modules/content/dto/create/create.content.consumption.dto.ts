import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsString,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { SwaggerType } from "@app/common/types";
import { BaseConsumptionProgramEnum } from "@app/module/base/types";

export class CreateContentConsumptionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentId: number;

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
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseConsumptionProgramEnum)
  typeConsumption: BaseConsumptionProgramEnum;
}
