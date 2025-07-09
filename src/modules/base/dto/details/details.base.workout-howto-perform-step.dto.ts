import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";
import { BaseHighlightColorEnum } from "../../types";

export class DetailsBaseWorkoutHowtoPerformStepDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Identifier",
    example: 1
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description",
    example: "Keep your back straight..."
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Illustration URL",
    example: "https://...",
    required: false
  })
  @IsOptional()
  @IsString()
  illustrationUrl?: string;

  @ApiProperty({
    enum: BaseHighlightColorEnum,
    enumName: "BaseHighlightColorEnum",
    description: "Highlight color",
    required: false
  })
  @IsOptional()
  @IsEnum(BaseHighlightColorEnum)
  highlight?: BaseHighlightColorEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Related workout ID",
    example: 5
  })
  @IsNumber()
  baseWorkoutId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Unique code",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Order",
    required: false
  })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Creation timestamp"
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Last update timestamp"
  })
  updatedAt: Date;
}
