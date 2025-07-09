import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

export class DetailsContentWorkoutDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "record id",
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "content id",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  contentId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Workout title",
    description: "title",
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Workout description",
    description: "description",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    example: true,
    description: "display title",
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  displayTitle?: boolean;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "base",
    description: "source",
  })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 456,
    description: "workout id",
  })
  @IsNumber()
  @IsNotEmpty()
  workoutId: number;
}
