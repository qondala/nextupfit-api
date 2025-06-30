import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsEnum,
  IsDate
} from "class-validator";

import {
  BaseExerciseTargetEnum,
  BaseWorkoutDisciplineEnum
} from "../../types";


export class DetailsBaseWorkoutDto {

  @ApiProperty({
    type: Number,
    description: "record id"  ,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    type: String,
    description: "Workout name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: String,
    description: "Workout description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    enum: BaseExerciseTargetEnum,
    enumName: "BaseExerciseTargetEnum",
    isArray: true,
    description: "Workout targets",
    example: Object.keys(BaseExerciseTargetEnum),
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsEnum(BaseExerciseTargetEnum, { each: true })
  targets: BaseExerciseTargetEnum[];


  @ApiProperty({
    type: Number,
    description: "Created by user id",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  createdByUserId: number;


  @ApiProperty({
    enum: BaseWorkoutDisciplineEnum,
    enumName: "BaseWorkoutDisciplineEnum",
    description: "Workout discipline",
    example: BaseWorkoutDisciplineEnum.gymnastics,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseWorkoutDisciplineEnum)
  discipline: BaseWorkoutDisciplineEnum;


  @ApiProperty({
    type: String,
    description: "Apple code",
    required: false,
  })
  @IsOptional()
  @IsString()
  appleCode?: string;


  @ApiProperty({
    type: String,
    description: "Fitbit code",
    required: false,
  })
  @IsOptional()
  @IsString()
  fitbitCode?: string;


  @ApiProperty({
    type: String,
    description: "Withings code",
    required: false,
  })
  @IsOptional()
  @IsString()
  withingsCode?: string;


  @ApiProperty({
    type: String,
    description: "Image url",
    required: false,
    example: "https://example.com/image.png",
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;


  @ApiProperty({
    type: String,
    description: "Illustration url",
    required: false,
    example: "https://example.com/illustration.png",
  })
  @IsOptional()
  @IsString()
  illustrationUrl?: string;


  @ApiProperty({
    type: String,
    description: "Video url",
    required: false,
    example: "https://example.com/video.mp4",
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;


  @ApiProperty({
    type: String,
    description: "Code",
    required: false,
    example: "code-001-wkwt",
  })
  @IsOptional()
  @IsString()
  code?: string;


  @ApiProperty({
    type: Date,
    description: "Created at",
    required: false,
    example: "2025-05-04T09:34:42.000Z",
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;


  @ApiProperty({
    type: Date,
    description: "Updated at",
    required: false,
    example: "2025-05-04T09:34:42.000Z",
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

