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

import { DetailsGymManagerDto } from "@app/module/gym/dto";
import { DetailsBaseSociologyDto } from "@app/module/base/dto";

import { ProgramStepActivityStatusEnum } from "../../types";
import { DetailsProgramStepActivityWorkingsessionWorkoutDto } from ".";
import { SwaggerType } from "@app/common/types";


export class DetailsProgramStepActivityWorkingsessionDto {

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
    type: SwaggerType.STRING,
    description: "Program step activity Working session name",
    example: "Daily workout",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step activity Working session description",
    example: "Here a sample description of the step",
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the program",
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
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  ownerUserId: number;
  

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
    description: "Step icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Step icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsString()
  coverUrl?: string;

  @ApiProperty({
    enum: ProgramStepActivityStatusEnum,
    enumName: "ProgramStepActivityStatusEnum",
    title: "ProgramStepActivityStatusEnum",
    description: "Program step activity status",
    example: ProgramStepActivityStatusEnum.published,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramStepActivityStatusEnum)
  status: ProgramStepActivityStatusEnum;


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
  viewsCount: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    example: 4.5,
    required: false
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number times Workingsession was rated",
    example: 3000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  ratingsCount: number;


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
    description: "Position of the Workingsession inside the Program Step Activity",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  position: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the Workingsession",
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
    type: SwaggerType.NUMBER,
    description: "Price of the Workingsession",
    example: 9.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;


  @ApiProperty({  
    type: () => DetailsProgramStepActivityWorkingsessionWorkoutDto,
    isArray: true,
    description: "Program step activity workingsessions",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramStepActivityWorkingsessionWorkoutDto)
  workouts?: DetailsProgramStepActivityWorkingsessionWorkoutDto[];


  @ApiProperty({
    type: () => DetailsGymManagerDto,
    isArray: true,
    description: "Workingsession managers",
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
}
