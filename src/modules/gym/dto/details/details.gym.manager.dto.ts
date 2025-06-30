import { ApiProperty } from "@nestjs/swagger";
import { GymManagerRoleEnum } from "../../types";
import {
  DetailsGymDto,
  DetailsGymManagerOverviewDto,
  DetailsGymManagerQualificationDto,
  DetailsGymManagerSpecializedInWorkoutDto
} from "./";
import { IsNotEmpty, IsNumber, IsOptional, IsEnum, IsBoolean } from "class-validator";
import { Type } from "class-transformer";



export class DetailsGymManagerDto {

  @ApiProperty({
    type: Number,
    description: 'ID of the gym manager',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    type: Number,
    description: 'ID of the gym',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    type: Number,
    description: 'ID of the gym manager user',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;


  @ApiProperty({
    type: Number,
    description: 'ID of the gym manager overview',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  managerOverviewId?: number;


  @ApiProperty({
    type: String,
    description: 'Role of the gym manager',
    example: 'owner',
    enum: GymManagerRoleEnum,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GymManagerRoleEnum)
  role: GymManagerRoleEnum;


  @ApiProperty({
    type: Date,
    description: 'Date of enrollment of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  dateEnrollment?: Date;


  @ApiProperty({
    type: Boolean,
    description: 'Suspended status of the gym manager',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  suspended?: boolean;


  @ApiProperty({
    type: () => DetailsGymManagerOverviewDto,
    description: 'Overview of the gym manager',
    example: {
      id: 1,
      gymManagerId: 1,
      name: 'John Doe',
      description: 'John Doe is a gym manager',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z'
    },
    required: false,
  })
  overview?: DetailsGymManagerOverviewDto;


  @ApiProperty({
    type: () => DetailsGymDto,
    description: 'Gym of the gym manager',
    example: {
      id: 1,
      name: 'Gym 1',
      description: 'Gym 1 is a gym',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z'
    },
    required: false,
  })
  @Type(() => DetailsGymDto)
  gym?: DetailsGymDto;


  @ApiProperty({
    type: () => DetailsGymManagerQualificationDto,
    description: 'Qualifications of the gym manager',
    example: {
      id: 1,
      gymManagerId: 1,
      name: 'John Doe',
      description: 'John Doe is a gym manager',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z'
    },
    required: false, 
  })
  @Type(() => DetailsGymManagerQualificationDto)
  qualifications?: DetailsGymManagerQualificationDto[];


  @ApiProperty({
    type: () => DetailsGymManagerSpecializedInWorkoutDto,
    description: 'Specialized workouts of the gym manager',
    example: {
      id: 1,
      gymManagerId: 1,
      name: 'John Doe',
      description: 'John Doe is a gym manager',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z'
    },
    required: false,
  })
  @Type(() => DetailsGymManagerSpecializedInWorkoutDto)
  specializedWorkouts?: DetailsGymManagerSpecializedInWorkoutDto[];


  @ApiProperty({
    type: Date,
    description: 'Created at of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @Type(() => Date)
  createdAt: Date;


  @ApiProperty({
    type: Date,
    description: 'Updated at of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @Type(() => Date)
  updatedAt: Date;
}
