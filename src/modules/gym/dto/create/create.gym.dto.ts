import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsInt} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

import { GymSpecialityEnum, GymVerifiedStatusEnum } from "../../types";

export class CreateGymDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym name",
    example: "The Training Ground",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym logo URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/gyms/logos/the-training-ground.png",
    required: false
  })
  @IsOptional()
  @IsString()
  logoUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym cover image URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/gyms/covers/the-training-ground.png",
    required: false
  })
  @IsOptional()
  @IsString()
  coverUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym logo URL",
    example: "1234 Nicollet Avenue, Minneapolis, MN 55403, USA",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym's email",
    example: "infos@thetrainingground.com",
    required: true
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym Facebook page URL",
    example: "https://web.facebook.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  facebookPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym's Twitter page URL",
    example: "https://twitter.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  twitterPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym's LinkedIn page URL",
    example: "https://linkedin.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  linkedinPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym's Youtube page URL",
    example: "https://youtube.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  youtubePageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym's Tittok page URL",
    example: "https://tiktok.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  tiktokPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym's phone line 1",
    example: "+19297554196",
    required: false
  })
  @IsPhoneNumber()
  @IsOptional()
  phoneLine1?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym's phone line 2",
    example: "+19297554196",
    required: false
  })
  @IsPhoneNumber()
  @IsOptional()
  phoneLine2?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym's moto",
    example: "Stay healthy, stay fit !",
    required: false
  })
  @IsOptional()
  @IsString()
  moto?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym followers count",
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsInt()
  followersCount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym owner user Id",
    example: 12334,
    required: false
  })
  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;


  @ApiProperty({
    enum: GymSpecialityEnum,
    description: "Gym speciality",
    example: GymSpecialityEnum.fitness,
    required: false
  })
  @IsNotEmpty()
  @IsEnum(GymSpecialityEnum)
  speciality: GymSpecialityEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym Stripe account id",
    example: "R4567FGH789",
    required: false
  })
  @IsOptional()
  @IsString()
  stripeAccountId?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym country id",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsInt()
  countryId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym State id",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsInt()
  stateId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym City id",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsInt()
  cityId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym members count",
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsInt()
  membersCount?: number;


  @ApiProperty({
    enum: GymVerifiedStatusEnum,
    enumName: "GymVerifiedStatusEnum",
    title: "GymVerifiedStatusEnum",
    description: "Gym verified status",
    example: GymVerifiedStatusEnum.unverified,
    required: false
  })
  @IsOptional()
  @IsEnum(GymVerifiedStatusEnum)
  verifiedStatus: GymVerifiedStatusEnum


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    example: 1000,
    required: false
  })
  @IsOptional()
  @IsInt()
  viewsCount: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    example: 4.5,
    required: false
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number times gym was rated",
    example: 3000,
    required: false
  })
  @IsOptional()
  @IsInt()
  ratingsCount: number;
}
