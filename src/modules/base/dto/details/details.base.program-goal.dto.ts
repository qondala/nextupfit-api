import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { ProgramTypeEnum } from "@app/module/program/types";

export class DetailsBaseProgramGoalDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program goal title",
    example: "Lose Weight",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program goal description",
    example: "Helps users lose weight in 8 weeks.",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: ProgramTypeEnum,
    enumName: "ProgramTypeEnum",
    description: "Program framework type",
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramTypeEnum)
  framework?: ProgramTypeEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Icon URL",
    example: "https://cdn.example.com/icons/lose-weight.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Unique code for translations",
    example: "lose-weight",
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record creation timestamp",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record last update timestamp",
    required: true,
  })
  updatedAt: Date;
}
