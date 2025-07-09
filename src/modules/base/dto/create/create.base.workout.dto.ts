import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import {
  BaseExerciseTargetEnum,
  BaseWorkoutDisciplineEnum
} from "../../types";


export class CreateBaseWorkoutDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Workout's name",
    example: "Pillated",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Workout's brief description",
    example: "Pilates is a low-impact exercise method developed by Joseph Pilates in the early 20th century. It emphasizes Core strength, Posture and Flexibility",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    enum: BaseExerciseTargetEnum,
    enumName: "BaseExerciseTargetEnum",
    isArray: true,
    description: "Workout's targets",
    example: Object.values(BaseExerciseTargetEnum),
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(BaseExerciseTargetEnum, { each: true })
  targets: BaseExerciseTargetEnum[];


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "UserId (Gym manager) who created the workout record.",
    example: 1368464,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;


  @ApiProperty({
    enum: BaseWorkoutDisciplineEnum,
    enumName: "BaseWorkoutDisciplineEnum",
    description: "Sport discipline the workout belongs.",
    example: BaseWorkoutDisciplineEnum.gymnastics,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseWorkoutDisciplineEnum)
  discipline: BaseWorkoutDisciplineEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Apple API code of the workout",
    example: "302",
    required: false,
  })
  @IsOptional()
  @IsString()
  appleCode?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Fitbit API code of the workout",
    example: "6402",
    required: false,
  })
  @IsOptional()
  @IsString()
  fitbitCode?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Withings API code of the workout",
    example: "24",
    required: false,
  })
  @IsOptional()
  @IsString()
  withingsCode?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Workout image URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/workouts/my-workout-001.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Workout illustration URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/workouts/my-illustration-001.gif",
    required: false,
  })
  @IsOptional()
  @IsString()
  illustrationUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Workout video URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/workouts/my-video-001.mp4",
    required: false,
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;
}
