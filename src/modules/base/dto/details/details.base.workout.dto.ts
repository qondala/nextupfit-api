import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsEnum,
  IsDate,
  IsInt
} from "class-validator";

import { SwaggerType } from "@app/common/types";

import {
  BaseExerciseTargetEnum,
  BaseWorkoutDisciplineEnum
} from "../../types";


export class DetailsBaseWorkoutDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id"  ,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Workout name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: SwaggerType.STRING,
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
    type: SwaggerType.INTEGER,
    description: "Created by user id",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
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
    type: SwaggerType.STRING,
    description: "Apple code",
    required: false,
  })
  @IsOptional()
  @IsString()
  appleCode?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Fitbit code",
    required: false,
  })
  @IsOptional()
  @IsString()
  fitbitCode?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Withings code",
    required: false,
  })
  @IsOptional()
  @IsString()
  withingsCode?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Image url",
    required: false,
    example: "https://example.com/image.png",
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Illustration url",
    required: false,
    example: "https://example.com/illustration.png",
  })
  @IsOptional()
  @IsString()
  illustrationUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Video url",
    required: false,
    example: "https://example.com/video.mp4",
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Code",
    required: false,
    example: "code-001-wkwt",
  })
  @IsOptional()
  @IsString()
  code?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Created at",
    required: false,
    example: "2025-05-04T09:34:42.000Z",
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Updated at",
    required: false,
    example: "2025-05-04T09:34:42.000Z",
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}

