import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsGymManagerDto } from ".";

export class DetailsGymManagerQualificationDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager qualification',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  managerId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Qualification name of the gym manager',
    example: 'Qualification name of the gym manager',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  qualificationName: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Institution name of the gym manager',
    example: 'Institution name of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  institutionName?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Year obtained of the gym manager qualification',
    example: 2022,
    required: false,
  })
  @IsOptional()
  @IsInt()
  yearObtained?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Certificate URL of the gym manager qualification',
    example: 'https://example.com/certificate',
    required: false,
  })
  @IsOptional()
  @IsString()
  certificateUrl?: string;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Active status of the gym manager qualification',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Created at of the gym manager qualification',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;


  @ApiProperty({
    type: () => DetailsGymManagerDto,
    title: "DetailsGymManagerDto",
    description: 'Gym manager of the gym manager qualification',
    required: true,
  })
  @Type(() => DetailsGymManagerDto)
  manager: DetailsGymManagerDto;
}
