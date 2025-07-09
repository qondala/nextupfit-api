import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { ProgramTypeEnum } from "@app/module/program/types";

export class CreateBaseProgramGoalDto {
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
}
