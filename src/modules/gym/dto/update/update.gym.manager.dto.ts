import {
  IsInt,
  IsOptional,
  IsEnum,
  IsNumber,
  IsString,
  IsBoolean,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { GymManagerSpecialityEnum } from "../../types";

export class UpdateGymManagerDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager name",
    example: "John Doe",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager user id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  managerUserId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager overview id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  managerOverviewId?: number;

  @ApiProperty({
    description: "Speciality of the gym manager",
    enum: GymManagerSpecialityEnum,
    enumName: "GymManagerSpecialityEnum",
    title: "GymManagerSpecialityEnum",
    example: GymManagerSpecialityEnum.fitness,
    required: false,
  })
  @IsOptional()
  @IsEnum(GymManagerSpecialityEnum)
  speciality?: GymManagerSpecialityEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  viewsCount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  attendeesCount?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: false,
    default: 0.0,
  })
  @IsNumber()
  @IsOptional()
  ratingsAvg?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  followersCount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  ratingsCount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsInt()
  @IsOptional()
  age?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsInt()
  @IsOptional()
  gender?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsInt()
  @IsOptional()
  yearsOfExperience?: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  certified?: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    required: false,
  })
  @IsBoolean()
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
