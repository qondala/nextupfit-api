import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
} from "class-validator";

import { SwaggerType } from "@app/common/types";

import { ProgramStatusEnum, ProgramTypeEnum } from "../../types";


export class UpdateProgramDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program name",
    example: "Daily workout",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ownerUserId?: number;
  

  @ApiProperty({
    enum: ProgramTypeEnum,
    enumName: "ProgramTypeEnum",
    description: "Program type",
    example: ProgramTypeEnum.nutrition,
    required: false,
  })
  @IsEnum(ProgramTypeEnum)
  type?: ProgramTypeEnum;


  @ApiProperty({
    enum: ProgramStatusEnum,
    enumName: "ProgramStatusEnum",
    description: "Program status",
    example: ProgramStatusEnum.published,
    required: false,
  })
  @IsEnum(ProgramStatusEnum)
  status?: ProgramStatusEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  iconUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/covers/my-program-cover.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  coverUrl?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program attendees count",
    example: 5000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  attendeesCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    example: 1000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  viewsCount?: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    example: 4.5,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number times program was rated",
    example: 3000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  ratingsCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the program",
    example: 2,
    required: false,
    default: 2
  })
  @IsOptional()
  @IsInt()
  duration?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit",
    example: 16,
    required: false,
    default: 16
  })
  @IsOptional()
  @IsInt()
  durationUnitId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  difficultyLevel?: number;
}

