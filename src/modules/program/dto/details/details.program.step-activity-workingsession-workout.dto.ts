import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsGymManagerDto } from "@app/module/gym/dto";
import { DetailsBaseSociologyDto, DetailsBaseUnitDto, DetailsBaseWorkoutDto } from "@app/module/base/dto";

import { ProgramStepActivityStatusEnum } from "../../types";
import { BaseWorkoutTypeEnum } from "@app/module/base/types";

export class DetailsProgramStepActivityWorkingsessionWorkoutDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workingsession's id",
    example: 6789,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  workingSessionId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Base workout's id",
    example: 12,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  baseWorkoutId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Working session's title",
    example: "Simple Pillates workout",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Workingsession's description",
    example: "Here's a sample description of the workout",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the workout",
    example: 60,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit id (e.g., minutes=1)",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  durationUnitId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the Workingession",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program",
    example: 80,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  programId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    example: 789,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  programStepId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step acitivity",
    example: 45645,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  programStepActivityId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program workout",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  ownerUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program workout",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  ownerManagerId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Date the program step activity was created",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdDate?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Workout image URL",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/workouts/my-workout-001.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Workout illustration URL",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/workouts/my-illustration-001.gif",
    required: false,
  })
  @IsOptional()
  @IsString()
  illustrationUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Workout illustration URL",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/workouts/my-video-001.mp4",
    required: false,
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiProperty({
    enum: ProgramStepActivityStatusEnum,
    enumName: "ProgramStepActivityStatusEnum",
    description: "Program step activity status",
    example: ProgramStepActivityStatusEnum.published,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramStepActivityStatusEnum)
  status: ProgramStepActivityStatusEnum;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Price of the workout",
    example: 0,
    required: false,
    default: 0,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number points gained after passing this Workingsession",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  points: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workingsession attendees count",
    example: 5000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  attendeesCount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    example: 1000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  viewsCount: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    example: 4.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number times Workingsession was rated",
    example: 3000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ratingsCount: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    example: 0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  difficultyLevel?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description:
      "Position of the Workout inside the Program Activity Workingsession",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  position: number;

  @ApiProperty({
    enum: BaseWorkoutTypeEnum,
    enumName: "BaseWorkoutTypeEnum",
    description: "Type of workout",
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseWorkoutTypeEnum)
  workoutType?: BaseWorkoutTypeEnum;

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    isArray: true,
    description: "Workout managers",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerDto)
  managers?: DetailsGymManagerDto[];

  @ApiProperty({
    type: () => DetailsBaseSociologyDto,
    isArray: true,
    description: "Workingsession audience",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseSociologyDto)
  audience?: DetailsBaseSociologyDto[];

  @ApiProperty({
    type: () => DetailsBaseSociologyDto,
    description: "Workingsession audience",
    required: false,
  })
  @Type(() => DetailsBaseSociologyDto)
  baseWorkout?: DetailsBaseWorkoutDto;

  @ApiProperty({
    type: () => DetailsBaseSociologyDto,
    description: "Workout duration unit",
    required: false,
  })
  @Type(() => DetailsBaseSociologyDto)
  durationUnit?: DetailsBaseUnitDto;
}
