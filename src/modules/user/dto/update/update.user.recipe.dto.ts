import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateUserRecipeDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recipe ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  recipeId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  contentId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Started at",
    example: "2025-07-13T13:16:17.000Z",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Finished at",
    example: "2025-07-13T13:16:17.000Z",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program ID",
    example: 1,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  programId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Step ID",
    example: 1,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  stepId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Activity ID",
    example: 1,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  activityId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Working session ID",
    example: 1,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  workingSessionId?: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Wether the user completed the recipe",
    example: false,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
