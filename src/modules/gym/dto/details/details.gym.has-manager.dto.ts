import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";

import { GymManagerRoleEnum } from "../../types";
import { DetailsGymDto, DetailsGymManagerDto } from ".";
import { GymManagerStatusEnum } from "../../types/gym.manager-status.enum";


export class DetailsGymHasManagerDto {

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
    description: 'ID of the gym manager',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerId: number;


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
    description: 'Status of the gym manager',
    enum: GymManagerStatusEnum,
    enumName: "GymManagerStatusEnum",
    example: GymManagerStatusEnum.active,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GymManagerStatusEnum)
  status: GymManagerStatusEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Last status update of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
    format: 'date-time',
  })
  lastStatusUpdate: Date;


  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: 'Gym of the gym manager',
    required: true,
  })
  @Type(() => DetailsGymDto)
  gym: DetailsGymDto;


  @ApiProperty({
    type: () => DetailsGymManagerDto,
    title: "DetailsGymManagerDto",
    description: 'Gym manager of the gym manager',
    required: true,
  })
  @Type(() => DetailsGymManagerDto)
  manager: DetailsGymManagerDto;

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
