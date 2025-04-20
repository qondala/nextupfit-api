import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDate, 
  IsPhoneNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { GymVerifiedStatusEnum } from "../../types";


export class CreateGymManagerOverviewDto {
  @ApiProperty({
    description: "Manager's short bio",
    example: "Let's have the best fit together !",
    required: false
  })
  @IsNotEmpty()
  @IsString()
  bio?: string;


  @ApiProperty({
    description: "Manager logo URL",
    required: false
  })
  @IsOptional()
  @IsString()
  text?: string;


  @ApiProperty({
    description: "Manager cover image URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/gyms/covers/the-training-ground.png",
    required: false
  })
  @IsOptional()
  @IsString()
  coverUrl?: string;


  @ApiProperty({
    description: "Manager logo URL",
    example: "1234 Nicollet Avenue, Minneapolis, MN 55403, USA",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  
  @ApiProperty({
    description: "Manager's email",
    example: "infos@thetrainingground.com",
    required: true
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty({
    description: "Manager Facebook page URL",
    example: "https://web.facebook.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  facebookPageUrl?: string;


  @ApiProperty({
    description: "Manager's Twitter page URL",
    example: "https://twitter.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  twitterPageUrl?: string;


  @ApiProperty({
    description: "Manager's LinkedIn page URL",
    example: "https://linkedin.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  linkedinPageUrl?: string;


  @ApiProperty({
    description: "Manager's Youtube page URL",
    example: "https://youtube.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  youtubePageUrl?: string;


  @ApiProperty({
    description: "Manager's Tittok page URL",
    example: "https://tiktok.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  tiktokPageUrl?: string;


  @ApiProperty({
    description: "Manager's phone line",
    example: "+19297554196",
    required: false
  })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;


  @ApiProperty({
    description: "Manager followers count",
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  followersCount?: number;


  @ApiProperty({
    description: "Who created user's profile overview",
    example: 12334,
    required: false
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;


  @ApiProperty({
    description: "Manager Stripe account id",
    example: "R4567FGH789",
    required: false
  })
  @IsOptional()
  @IsString()
  stripeAccountId?: string;


  @ApiProperty({
    description: "Manager country id",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  countryId?: number;


  @ApiProperty({
    description: "Manager State id",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  stateId?: number;


  @ApiProperty({
    description: "Manager City id",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  cityId: number;


  @ApiProperty({
    description: "Manager session attendees count",
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  attendeesCount?: number;


  @ApiProperty({
    description: "Manager verified status",
    example: GymVerifiedStatusEnum.unverified,
    required: false
  })
  @IsOptional()
  @IsEnum(GymVerifiedStatusEnum)
  verifiedStatus: GymVerifiedStatusEnum


  @ApiProperty({
    description: "Manager record date",
    example: Date(),
    required: false
  })
  @IsOptional()
  @IsDate()
  createdDate: Date;


  @ApiProperty({
    description: "Text listing manager's professional experiences",
    example: "text",
    required: false
  })
  @IsOptional()
  @IsString()
  experiences: string;
  

  @ApiProperty({
    description: "Views count",
    example: 1000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  viewsCount: number;


  @ApiProperty({
    description: "Ratings average",
    example: 4.5,
    required: false
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg: number;


  @ApiProperty({
    description: "Number times manager was rated",
    example: 3000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  ratingsCount: number;
}
