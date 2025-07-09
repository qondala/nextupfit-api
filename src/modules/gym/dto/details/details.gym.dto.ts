import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from "class-validator";

import { SwaggerType } from "@app/common/types";
import { DetailsUserDto } from '@app/module/user/dto';

import {
  GymSpecialityEnum,
  GymVerifiedStatusEnum
} from '../../types';

import {
  DetailsGymMembershipPlanDto,
  DetailsGymSpecializedInNutritionDto,
  DetailsGymSpecializedInWorkoutDto
} from './';



export class DetailsGymDto {

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
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  createdByUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym name",
    example: "Gym Name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym logo url",
    example: "https://example.com/logo.png",
    required: false,
  })
  logoUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym cover url",
    example: "https://example.com/cover.png",
    required: false,
  })
  coverUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym address",
    example: "123 Main St, City, Country",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym email",
    example: "gym@example.com",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym facebook page url",
    example: "https://facebook.com/gym",
    required: false,
  })
  facebookPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym twitter page url",
    example: "https://twitter.com/gym",
    required: false,
  })
  twitterPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym linkedin page url",
    example: "https://linkedin.com/gym",
    required: false,
  })
  linkedinPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym youtube page url",
    example: "https://youtube.com/gym",
    required: false,
  })
  youtubePageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym tiktok page url",
    example: "https://tiktok.com/gym",
    required: false,
  })
  tiktokPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym phone line 1",
    example: "123-456-7890",
    required: false,
  })
  phoneLine1?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym moto",
    example: "Gym Moto",
    required: false,
  })
  moto?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym followers count",
    example: 1234,
    required: false,
  })
  followersCount?: number;


  @ApiProperty({
    enum: GymSpecialityEnum,
    enumName: "GymSpecialityEnum",
    description: "Gym speciality",
    title: "GymSpecialityEnum",
    example: GymSpecialityEnum.fitness,
    required: true,
  })
  @IsDefined()
  @IsEnum(GymSpecialityEnum)
  speciality: GymSpecialityEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym stripe account id",
    example: "stripeAccountId",
    required: false,
  })
  stripeAccountId?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym country id",
    example: 1234,
    required: false,
  })
  countryId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym state id",
    example: 1234,
    required: false,
  })
  stateId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym city id",
    example: 1234,
    required: false,
  })
  cityId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym members count",
    example: 1234,
    required: false,
  })
  membersCount?: number;


  @ApiProperty({
    enum: GymVerifiedStatusEnum,
    enumName: "GymVerifiedStatusEnum",
    description: "Gym verified status",
    title: "GymVerifiedStatusEnum",
    example: GymVerifiedStatusEnum.verified,
    required: true,
  })
  @IsDefined()
  @IsEnum(GymVerifiedStatusEnum)
  verifiedStatus: GymVerifiedStatusEnum


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym views count",
    example: 1234,
    required: false,
  })
  viewsCount: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Gym ratings avg",
    example: 4.5,
    required: false,
  })
  ratingsAvg: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym ratings count",
    example: 1234,
    required: false,
  })
  ratingsCount: number;


  @ApiProperty({
    type: () => DetailsUserDto,
    title: "DetailsUserDto",
    description: "Gym owner",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsUserDto)
  owner: DetailsUserDto;


  @ApiProperty({
    type: () => DetailsGymMembershipPlanDto,
    isArray: true,
    title: "DetailsGymMembershipPlanDto[]",
    description: "Gym membership plans",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymMembershipPlanDto)
  membershipPlans?: DetailsGymMembershipPlanDto[];


  @ApiProperty({
    type: () => DetailsGymSpecializedInWorkoutDto,
    isArray: true,
    title: "DetailsGymSpecializedInWorkoutDto[]",
    description: "Gym specialized workouts",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymSpecializedInWorkoutDto)
  specializedWorkouts?: DetailsGymSpecializedInWorkoutDto[];


  @ApiProperty({
    type: () => DetailsGymSpecializedInNutritionDto,
    isArray: true,
    title: "DetailsGymSpecializedInNutritionDto[]",
    description: "Gym specialized nutrition",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymSpecializedInNutritionDto)
  specializedNutrition?: DetailsGymSpecializedInNutritionDto[];


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Gym created date",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  createdAt?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Gym updated date",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  updatedAt?: Date;
}
