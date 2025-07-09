import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDate, 
  IsPhoneNumber,
  IsInt} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { GymVerifiedStatusEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class CreateGymManagerOverviewDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager's short bio",
    example: "Let's have the best fit together !",
    required: false
  })
  @IsNotEmpty()
  @IsString()
  bio?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager logo URL",
    required: false
  })
  @IsOptional()
  @IsString()
  text?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager cover image URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/gyms/covers/the-training-ground.png",
    required: false
  })
  @IsOptional()
  @IsString()
  coverUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager logo URL",
    example: "1234 Nicollet Avenue, Minneapolis, MN 55403, USA",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager's email",
    example: "infos@thetrainingground.com",
    required: true
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager Facebook page URL",
    example: "https://web.facebook.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  facebookPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager's Twitter page URL",
    example: "https://twitter.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  twitterPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager's LinkedIn page URL",
    example: "https://linkedin.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  linkedinPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager's Youtube page URL",
    example: "https://youtube.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  youtubePageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager's Tittok page URL",
    example: "https://tiktok.com/thetrainingground",
    required: false
  })
  @IsOptional()
  @IsString()
  tiktokPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager's phone line",
    example: "+19297554196",
    required: false
  })
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager followers count",
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsInt()
  followersCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Who created user's profile overview",
    example: 12334,
    required: false
  })
  @IsNotEmpty()
  @IsInt()
  managerUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Manager Stripe account id",
    example: "R4567FGH789",
    required: false
  })
  @IsOptional()
  @IsString()
  stripeAccountId?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager country id",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsInt()
  countryId?: number;


  @ApiProperty({
    description: "Manager State id",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsInt()
  stateId?: number;


  @ApiProperty({
    description: "Manager City id",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsInt()
  cityId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager session attendees count",
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsInt()
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
    description: "Number times manager was rated",
    example: 3000,
    required: false
  })
  @IsOptional()
  @IsInt()
  ratingsCount: number;
}
