import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
  IsInt,
} from "class-validator";
import { ProgramStepActivityStatusEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class UpdateProgramStepActivityWorkingsessionWorkoutDto {

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
  @IsOptional()
  @IsNumber()
  baseWorkoutId?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Working session's title",
    example: "Simple Pillates workout",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;


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
    description: "Id of the gym promoting the Workingession",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program",
    example: 80,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    example: 789,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programStepId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step acitivity",
    example: 45645,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programStepActivityId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program workout",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ownerUserId?: number;
  

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
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
    description: "Workout illustration URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/workouts/my-video-001.mp4",
    required: false,
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;
  

  @ApiProperty({
    enumName: "ProgramStepActivityStatusEnum",
    title: "ProgramStepActivityStatusEnum",
    description: "Program step activity status",
    example: ProgramStepActivityStatusEnum.published,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramStepActivityStatusEnum)
  status?: ProgramStepActivityStatusEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number points gained after passing this Workingsession",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  points?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workingsession attendees count",
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  attendeesCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    example: 1000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  viewsCount?: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    example: 4.5,
    required: false
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number times Workingsession was rated",
    example: 3000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  ratingsCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  difficultyLevel?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Position of the Workout inside the Working session",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  position?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the Workingsession",
    example: 60,
    required: false,
  })
  @IsOptional()
  @IsInt()
  duration?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit id (e.g., minutes=1)",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  durationUnitId?: number;
}

