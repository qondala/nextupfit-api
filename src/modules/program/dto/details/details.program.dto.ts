import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  IsDefined,
  IsBoolean,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";

import { DetailsSocialRatingsDto } from "@app/module/social/dto/details";
import { SwaggerType } from "@app/common/types";

import { DetailsGymDto, DetailsGymManagerDto } from "@app/module/gym/dto";
import { DetailsBaseSociologyDto } from "@app/module/base/dto";

import { ProgramStatusEnum, ProgramTypeEnum } from "../../types";
import { DetailsProgramStepDto, DetailsProgramSubscriptionPlanDto } from ".";


export class DetailsProgramDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program name",
    example: "Daily workout",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsInt()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  ownerUserId: number;
  

  @ApiProperty({
    description: "Program type",
    enum: ProgramTypeEnum,
    enumName: "ProgramTypeEnum",
    title: "ProgramTypeEnum",
    example: ProgramTypeEnum.nutrition,
    required: true,
  })
  @IsEnum(ProgramTypeEnum)
  type: ProgramTypeEnum;


  @ApiProperty({
    description: "Program status",
    enum: ProgramStatusEnum,
    enumName: "ProgramStatusEnum",
    title: "ProgramStatusEnum",
    example: ProgramStatusEnum.published,
    required: true,
  })
  @IsEnum(ProgramStatusEnum)
  status: ProgramStatusEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsString()
  iconUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/covers/my-program-cover.png",
    required: false,
  })
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
  @IsNumber()
  attendeesCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    example: 1000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
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
  @IsNumber()
  ratingsCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the program",
    example: 2,
    required: false,
    default: 2
  })
  @IsOptional()
  @IsNumber()
  duration?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit",
    example: 16,
    required: false,
    default: 16
  })
  @IsOptional()
  @IsNumber()
  durationUnitId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  difficultyLevel?: number;


  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: "Gym owner",
    required: false,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsGymDto)
  gym?: DetailsGymDto;


  @ApiProperty({
    type: () => DetailsProgramStepDto,
    isArray: true,
    title: "DetailsProgramStepDto[]",
    description: "Program steps",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramStepDto)
  steps?: DetailsProgramStepDto[];


  @ApiProperty({
    type: () => DetailsGymManagerDto,
    isArray: true,
    title: "DetailsGymManagerDto[]",
    description: "Program managers",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerDto)
  managers?: DetailsGymManagerDto[];


  @ApiProperty({
    type: () => DetailsBaseSociologyDto,
    isArray: true,
    title: "DetailsBaseSociologyDto[]",
    description: "Program audience",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseSociologyDto)
  audience?: DetailsBaseSociologyDto[];


  @ApiProperty({
    type: () => DetailsProgramSubscriptionPlanDto,
    isArray: true,
    title: "DetailsProgramSubscriptionPlanDto[]",
    description: "Program subscription plans",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramSubscriptionPlanDto)
  subscriptionPlans?: DetailsProgramSubscriptionPlanDto[];


  @ApiProperty({
    type: () => DetailsSocialRatingsDto,
    title: "DetailsSocialRatingsDto",
    description: "Program ratings",
    required: false,
  })
  @ValidateNested()
  @Type(() => DetailsSocialRatingsDto)
  rating?: DetailsSocialRatingsDto;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is program favorited by the user",
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;
}
