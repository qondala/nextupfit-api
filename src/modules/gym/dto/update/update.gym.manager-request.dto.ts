import {
  IsBoolean, 
  IsDate, 
  IsNotEmpty, 
  IsInt, 
  IsOptional, 
  IsString, 
  IsUrl
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
  
export class UpdateGymManagerRequestDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    example: 235,
    required: false,
  })
  @IsOptional()
  @IsInt()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Applicant user id",
    example: 1235,
    required: false,
  })
  @IsOptional()
  @IsInt()
  applicantUserId?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Motivation letter",
    example: "Sample motivation letter",
    required: false,
  })
  @IsOptional()
  @IsString()
  letter?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Applicant's portfolio Url",
    example: "Sample motivation letter",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  portfolioUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Applicant's Document Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/gym/resume-applicant-00345.png",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  documentUrl?: string;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether application is favoriate",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  favorite?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether application is accepted",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  accepted?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether application is rejected",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsDate()
  rejected?: boolean;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date application was accepted",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  acceptedDate?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date application was rejected",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  rejectedDate?: Date;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager user id who accepted the application",
    example: 1223,
    required: false,
  })
  @IsOptional()
  @IsInt()
  acceptedByGymManagerUserId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager user id who rejected the application",
    example: 1223,
    required: false,
  })
  @IsOptional()
  @IsInt()
  rejectedByGymManagerUserId?: number;
}

