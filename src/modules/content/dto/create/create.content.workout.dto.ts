import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class CreateContentWorkoutDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "content id",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentId: number;

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
    required: true,
  })
  @IsString()
  @IsOptional()
  source: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 456,
    description: "workout id",
    required: true
  })
  @IsInt()
  @IsNotEmpty()
  workoutId: number;
}
