import { ApiProperty } from "@nestjs/swagger";
import { GymVerifiedStatusEnum } from "../../types";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";


export class DetailsGymManagerOverviewDto {
  @ApiProperty({
    type: Number,
    description: 'ID of the gym manager',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    type: Number,
    description: 'ID of the gym manager user',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;


  @ApiProperty({
    type: String,
    description: 'Bio of the gym manager',
    example: 'Bio of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;


  @ApiProperty({
    type: String,
    description: 'Text of the gym manager',
    example: 'Text of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  text?: string;


  @ApiProperty({
    type: String,
    description: 'Cover URL of the gym manager',
    example: 'Cover URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  coverUrl?: string;


  @ApiProperty({
    type: String,
    description: 'Address of the gym manager',
    example: 'Address of the gym manager',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string;
  

  @ApiProperty({
    type: String,
    description: 'Email of the gym manager',
    example: 'Email of the gym manager',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;


  @ApiProperty({
    type: String,
    description: 'Facebook page URL of the gym manager',
    example: 'Facebook page URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  facebookPageUrl?: string;


  @ApiProperty({
    type: String,
    description: 'Twitter page URL of the gym manager',
    example: 'Twitter page URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  twitterPageUrl?: string;


  @ApiProperty({
    type: String,
    description: 'Linkedin page URL of the gym manager',
    example: 'Linkedin page URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  linkedinPageUrl?: string;


  @ApiProperty({
    type: String,
    description: 'Youtube page URL of the gym manager',
    example: 'Youtube page URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  youtubePageUrl?: string;


  @ApiProperty({
    type: String,
    description: 'Tiktok page URL of the gym manager',
    example: 'Tiktok page URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  tiktokPageUrl?: string;


  @ApiProperty({
    type: String,
    description: 'Phone of the gym manager',
    example: 'Phone of the gym manager',
    required: false,
  }) 
  @IsOptional()
  @IsString()
  phone?: string;


  @ApiProperty({
    type: Number,
    description: 'Followers count of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsNumber()
  followersCount?: number;


  @ApiProperty({
    type: String,
    description: 'Stripe account ID of the gym manager',
    example: 'Stripe account ID of the gym manager',
    required: false,
  }) 
  @IsOptional()
  @IsString()
  stripeAccountId?: string;


  @ApiProperty({
    type: Number,
    description: 'Country ID of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsNumber()
  countryId?: number;


  @ApiProperty({
    type: Number,
    description: 'State ID of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsNumber()
  stateId?: number;


  @ApiProperty({
    type: Number,
    description: 'City ID of the gym manager',
    example: 1,
    required: true,
  }) 
  @IsNotEmpty()
  @IsNumber()
  cityId: number;


  @ApiProperty({
    type: Number,
    description: 'Attendees count of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsNumber()
  attendeesCount?: number;


  @ApiProperty({
    type: GymVerifiedStatusEnum,
    description: 'Verified status of the gym manager',
    example: 'verified',
    enum: GymVerifiedStatusEnum,
    required: true,
  }) 
  @IsNotEmpty()
  @IsEnum(GymVerifiedStatusEnum)
  verifiedStatus: GymVerifiedStatusEnum;


  @ApiProperty({
    type: Date,
    description: 'Created date of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  createdDate: Date;


  @ApiProperty({
    type: String,
    description: 'Experiences of the gym manager',
    example: 'Experiences of the gym manager',
    required: false,
  }) 
  @IsOptional()
  @IsString()
  experiences?: string;
  

  @ApiProperty({
    type: Number,
    description: 'Views count of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsNumber()
  viewsCount?: number;


  @ApiProperty({
    type: Number,
    description: 'Ratings average of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsNumber()
  ratingsAvg?: number;


  @ApiProperty({
    type: Number,
    description: 'Ratings count of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsNumber()
  ratingsCount?: number;


  @ApiProperty({
    type: Date,
    description: 'Created at of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;


  @ApiProperty({
    type: Date,
    description: 'Updated at of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
