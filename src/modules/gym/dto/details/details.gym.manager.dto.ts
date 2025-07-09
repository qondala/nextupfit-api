import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsArray,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";

import { GymManagerRoleEnum, GymManagerSpecialityEnum } from "../../types";
import {
  DetailsGymDto,
  DetailsGymManagerOverviewDto,
  DetailsGymManagerQualificationDto,
  DetailsGymManagerSpecializedInNutritionDto,
  DetailsGymManagerSpecializedInWorkoutDto
} from "./";
import { DetailsUserDto } from "@app/module/user/dto";


export class DetailsGymManagerDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager user',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager overview',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  managerOverviewId?: number;


  @ApiProperty({
    description: 'Role of the gym manager',
    enum: GymManagerRoleEnum,
    enumName: "GymManagerRoleEnum",
    title: "GymManagerRoleEnum",
    example: GymManagerRoleEnum.owner,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GymManagerRoleEnum)
  role: GymManagerRoleEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Date of enrollment of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
    format: 'date',
  })
  @IsOptional()
  @Type(() => Date)
  dateEnrollment?: Date;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Suspended status of the gym manager',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  suspended?: boolean;


  @ApiProperty({
    description: 'Speciality of the gym manager',
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
    description: 'User of the gym manager',
    required: true,
  })
  @Type(() => DetailsUserDto)
  user: DetailsUserDto;


  @ApiProperty({
    type: () => DetailsGymManagerOverviewDto,
    title: "DetailsGymManagerOverviewDto",
    description: 'Overview of the gym manager',
    required: false,
  })
  @Type(() => DetailsGymManagerOverviewDto)
  overview?: DetailsGymManagerOverviewDto;


  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: 'Gym of the gym manager',
    required: false,
  })
  @Type(() => DetailsGymDto)
  gym?: DetailsGymDto;


  @ApiProperty({
    type: () => DetailsGymManagerQualificationDto,
    isArray: true,
    title: "DetailsGymManagerQualificationDto[]",
    description: 'Qualifications of the gym manager',
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
    description: 'Specialized workouts of the gym manager',
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
    description: 'Specialized nutritions of the gym manager',
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerSpecializedInNutritionDto)
  specializedNutritions?: DetailsGymManagerSpecializedInNutritionDto[];


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Created at of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Updated at of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
