import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsEnum, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";

import { GymManagerRoleEnum, GymManagerSpecialityEnum } from "../../types";


export class UpdateGymManagerDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager user',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  managerUserId?: number;


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
    required: false,
  })
  @IsOptional()
  @IsEnum(GymManagerRoleEnum)
  role?: GymManagerRoleEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Date of enrollment of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
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
    required: false,
  })
  @IsOptional()
  @IsEnum(GymManagerSpecialityEnum)
  speciality?: GymManagerSpecialityEnum;
}
