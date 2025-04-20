import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseExerciseTargetEnum, BaseWorkoutDisciplineEnum } from "../../types";


export class CreateBaseWorkoutDto {

  @ApiProperty({
    type: String,
    description: "Workout's name",
    example: "Pillated",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: String,
    description: "Workout's brief description",
    example: "Pilates is a low-impact exercise method developed by Joseph Pilates in the early 20th century. It emphasizes Core strength, Posture and Flexibility",
    required: false
  })
  @IsNotEmpty()
  @IsOptional()
  description?: string;


  @ApiProperty({
    enum: BaseExerciseTargetEnum,
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
    type: Number,
    description: "UserId (Gym manager) who created the workout record.",
    example: 1368464,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
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
    type: String,
    description: "Apple API code of the workout",
    example: "302",
    required: false,
  })
  @IsOptional()
  @IsString()
  appleCode?: string;


  @ApiProperty({
    type: String,
    description: "Fitbit API code of the workout",
    example: "6402",
    required: false,
  })
  @IsOptional()
  @IsString()
  fitbitCode?: string;


  @ApiProperty({
    type: String,
    description: "Withings API code of the workout",
    example: "24",
    required: false,
  })
  @IsOptional()
  @IsString()
  withingsCode?: string;


  @ApiProperty({
    type: String,
    description: "Workout image URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/workouts/my-workout-001.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;


  @ApiProperty({
    type: String,
    description: "Workout illustration URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/workouts/my-illustration-001.gif",
    required: false,
  })
  @IsOptional()
  @IsString()
  illustrationUrl?: string;


  @ApiProperty({
    type: String,
    description: "Workout video URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/workouts/my-video-001.mp4",
    required: false,
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;
}
