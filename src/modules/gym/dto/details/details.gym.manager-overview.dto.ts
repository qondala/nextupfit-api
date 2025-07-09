import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  IsNumber
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { GymVerifiedStatusEnum } from "../../types";


export class DetailsGymManagerOverviewDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager user',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  managerUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Bio of the gym manager',
    example: 'Bio of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Text of the gym manager',
    example: 'Text of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  text?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Cover URL of the gym manager',
    example: 'Cover URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  coverUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Address of the gym manager',
    example: 'Address of the gym manager',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string;
  

  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Email of the gym manager',
    example: 'Email of the gym manager',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  email: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Facebook page URL of the gym manager',
    example: 'Facebook page URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  facebookPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Twitter page URL of the gym manager',
    example: 'Twitter page URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  twitterPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Linkedin page URL of the gym manager',
    example: 'Linkedin page URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  linkedinPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Youtube page URL of the gym manager',
    example: 'Youtube page URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  youtubePageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Tiktok page URL of the gym manager',
    example: 'Tiktok page URL of the gym manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  tiktokPageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Phone of the gym manager',
    example: 'Phone of the gym manager',
    required: false,
  }) 
  @IsOptional()
  @IsString()
  phone?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Followers count of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsInt()
  followersCount?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Stripe account ID of the gym manager',
    example: 'Stripe account ID of the gym manager',
    required: false,
  }) 
  @IsOptional()
  @IsString()
  stripeAccountId?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Country ID of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsInt()
  countryId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'State ID of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsInt()
  stateId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'City ID of the gym manager',
    example: 1,
    required: true,
  }) 
  @IsNotEmpty()
  @IsInt()
  cityId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Attendees count of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsInt()
  attendeesCount?: number;


  @ApiProperty({
    enum: GymVerifiedStatusEnum,
    enumName: 'GymVerifiedStatusEnum',
    title: 'GymVerifiedStatusEnum',
    description: 'Verified status of the gym manager',
    example: 'verified',
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
    type: SwaggerType.STRING,
    description: 'Experiences of the gym manager',
    example: 'Experiences of the gym manager',
    required: false,
  }) 
  @IsOptional()
  @IsString()
  experiences?: string;
  

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Views count of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsInt()
  viewsCount?: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: 'Ratings average of the gym manager',
    example: 5.4,
    required: false,
  }) 
  @IsOptional()
  @IsNumber()
  ratingsAvg?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Ratings count of the gym manager',
    example: 1,
    required: false,
  }) 
  @IsOptional()
  @IsInt()
  ratingsCount?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Created at of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Updated at of the gym manager',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  }) 
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
