import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";

import { DetailsUserDto } from "@app/module/user/dto";

import { DetailsGymDto } from "./";


export class DetailsGymFollowerDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym follower',
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
    description: 'ID of the follower',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  followerUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Accepted date of the gym follower',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  acceptedDate?: Date;
  
  
  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Stopped date of the gym follower',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  stoppedDate?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Blocked date of the gym follower',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  blockedDate?: Date;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Accepted status of the gym follower',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  accepted?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Blocked status of the gym follower',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;
  
  
  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Stopped status of the gym follower',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  stopped?: boolean;


  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: 'Gym of the gym follower',
    required: true,
  })
  @Type(() => DetailsGymDto)
  gym: DetailsGymDto;


  @ApiProperty({
    type: () => DetailsUserDto,
    title: "DetailsUserDto",
    description: 'Follower of the gym follower',
    required: true,
  })
  @Type(() => DetailsUserDto)
  follower: DetailsUserDto;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Created at of the gym follower',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Updated at of the gym follower',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
