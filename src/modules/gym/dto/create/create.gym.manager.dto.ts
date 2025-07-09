import {
  IsInt,
  IsOptional,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { GymManagerRoleEnum, GymManagerSpecialityEnum } from "../../types";


export class CreateGymManagerDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    example: 345,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gymId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym manager id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  managerUserId: number;


  @ApiProperty({
    enum: GymManagerRoleEnum,
    enumName: "GymManagerRoleEnum",
    title: "GymManagerRoleEnum",
    description: "Gym manager role",
    example: GymManagerRoleEnum.owner,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GymManagerRoleEnum)
  role: GymManagerRoleEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Gym manager enrollment date",
    example: "2025-04-15",
    required: false,
  })
  @IsOptional()
  @IsDate()
  dateEnrollment?: Date;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether the manager was suspended",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  suspended?: boolean;

  @ApiProperty({
    enum: GymManagerSpecialityEnum,
    enumName: "GymManagerSpecialityEnum",
    title: "GymManagerSpecialityEnum",
    description: 'Speciality of the gym manager',
    example: GymManagerSpecialityEnum.fitness,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GymManagerSpecialityEnum)
  speciality: GymManagerSpecialityEnum;
}
