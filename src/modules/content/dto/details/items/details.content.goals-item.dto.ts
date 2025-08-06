import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

export class DetailsContentGoalsItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content goal block id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentGoalsId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "Goal title",
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "description",
    example: "Goal description",
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 0,
    required: true,
  })
  @IsInt()
  position: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "base goal id",
    example: 1234,
    required: false,
  })
  @IsInt()
  @IsOptional()
  baseGoalId?: number;
}
