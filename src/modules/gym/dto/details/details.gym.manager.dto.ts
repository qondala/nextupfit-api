import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  IsString,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsUserDto } from "@app/module/user/dto";

import { GymManagerSpecialityEnum } from "../../types";
import {
  DetailsGymManagerOverviewDto,
  DetailsGymManagerQualificationDto,
  DetailsGymManagerSpecializedInNutritionDto,
  DetailsGymManagerSpecializedInWorkoutDto,
} from "./";

export class DetailsGymManagerDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Name of the gym manager",
    example: "John Doe",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager user",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager overview",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  managerOverviewId: number;

  @ApiProperty({
    description: "Speciality of the gym manager",
    enum: GymManagerSpecialityEnum,
    enumName: "GymManagerSpecialityEnum",
    title: "GymManagerSpecialityEnum",
    example: GymManagerSpecialityEnum.fitness,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GymManagerSpecialityEnum)
  speciality: GymManagerSpecialityEnum;

  @ApiProperty({
    type: () => DetailsUserDto,
    title: "DetailsUserDto",
    description: "User of the gym manager",
    required: true,
  })
  @Type(() => DetailsUserDto)
  user: DetailsUserDto;

  @ApiProperty({
    type: () => DetailsGymManagerOverviewDto,
    title: "DetailsGymManagerOverviewDto",
    description: "Overview of the gym manager",
    required: false,
  })
  @Type(() => DetailsGymManagerOverviewDto)
  overview?: DetailsGymManagerOverviewDto;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count of the gym manager",
    example: 0,
    required: true,
    default: 0,
  })
  viewsCount: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Attendees count of the gym manager",
    example: 0,
    required: true,
    default: 0,
  })
  attendeesCount: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average of the gym manager",
    example: 0.0,
    required: true,
    default: 0.0,
  })
  ratingsAvg: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Followers count of the gym manager",
    example: 0,
    required: true,
    default: 0,
  })
  followersCount: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Ratings count of the gym manager",
    example: 0,
    required: true,
    default: 0,
  })
  ratingsCount: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  age: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  gender: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  yearsOfExperience: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    required: false,
  })
  @IsOptional()
  certified?: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    required: false,
  })
  @IsOptional()
  verified?: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsInt()
  @IsOptional()
  level?: number;

  @ApiProperty({
    type: () => DetailsGymManagerQualificationDto,
    isArray: true,
    title: "DetailsGymManagerQualificationDto[]",
    description: "Qualifications of the gym manager",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerQualificationDto)
  qualifications?: DetailsGymManagerQualificationDto[];

  @ApiProperty({
    type: () => DetailsGymManagerSpecializedInWorkoutDto,
    isArray: true,
    title: "DetailsGymManagerSpecializedInWorkoutDto[]",
    description: "Specialized workouts of the gym manager",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerSpecializedInWorkoutDto)
  specializedWorkouts?: DetailsGymManagerSpecializedInWorkoutDto[];

  @ApiProperty({
    type: () => DetailsGymManagerSpecializedInNutritionDto,
    isArray: true,
    title: "DetailsGymManagerSpecializedInNutritionDto[]",
    description: "Specialized nutritions of the gym manager",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerSpecializedInNutritionDto)
  specializedNutritions?: DetailsGymManagerSpecializedInNutritionDto[];

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Created at of the gym manager",
    example: "2022-01-01T00:00:00.000Z",
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Updated at of the gym manager",
    example: "2022-01-01T00:00:00.000Z",
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
