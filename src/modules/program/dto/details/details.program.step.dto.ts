import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  IsNumber,
} from "class-validator";
import { Type } from "class-transformer";

import { DetailsGymManagerDto } from "@app/module/gym/dto";
import { DetailsBaseSociologyDto } from "@app/module/base/dto";

import { ProgramStepStatusEnum } from "../../types";
import { DetailsProgramStepActivityDto } from "..";
import { SwaggerType } from "@app/common/types";


export class DetailsProgramStepDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step name",
    example: "Daily workout",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step description",
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
    required: false,
  })
  @IsNotEmpty()
  @IsInt()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program",
    example: 80,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  programId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ownerUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Step icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsString()
  iconUrl?: string;

  @ApiProperty({
    enum: ProgramStepStatusEnum,
    enumName: "ProgramStepStatusEnum",
    title: "ProgramStepStatusEnum",
    description: "Program step status",
    example: ProgramStepStatusEnum.published,
    required: false,
  })
  @IsNotEmpty()
  @IsEnum(ProgramStepStatusEnum)
  status: ProgramStepStatusEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Step attendees count",
    example: 5000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  attendeesCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    example: 1000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  viewsCount?: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    example: 4.5,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number times step was rated",
    example: 3000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  ratingsCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the step",
    example: 2,
    required: false,
    default: 2
  })
  @IsOptional()
  @IsInt()
  duration?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit",
    example: 16,
    required: false,
    default: 16
  })
  @IsOptional()
  @IsInt()
  durationUnitId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number of workouts in the step",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  workoutsCount?: number;

  
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  difficultyLevel?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Position of the Step inside the Program",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsInt()
  position: number;

  @ApiProperty({
    description: "Date the program step was created",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: "Date the program step was created",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;


  @ApiProperty({  
    type: () => DetailsProgramStepActivityDto,
    isArray: true,
    description: "Program step activities",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramStepActivityDto)
  activities?: DetailsProgramStepActivityDto[];


  @ApiProperty({
    type: () => DetailsGymManagerDto,
    isArray: true,
    description: "Step managers",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerDto)
  managers?: DetailsGymManagerDto[];


  @ApiProperty({
    type: () => DetailsBaseSociologyDto,
    isArray: true,
    description: "Step audience",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseSociologyDto)
  audience?: DetailsBaseSociologyDto[];
}
