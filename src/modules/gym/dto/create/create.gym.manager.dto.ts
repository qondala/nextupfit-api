import {
  IsInt,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { GymManagerSpecialityEnum } from "../../types";

export class CreateGymManagerDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Name of the gym manager',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager user id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  managerUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager overview id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
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
    type: SwaggerType.INTEGER,
    required: false,
    default: 0
  })
  @IsInt()
  @IsOptional()
  viewsCount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    default: 0
  })
  @IsInt()
  @IsOptional()
  attendeesCount?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: false,
    default: 0.0
  })
  @IsNumber()
  @IsOptional()
  ratingsAvg?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    default: 0
  })
  @IsInt()
  @IsOptional()
  followersCount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    default: 0
  })
  @IsInt()
  @IsOptional()
  ratingsCount?: number;


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
}
