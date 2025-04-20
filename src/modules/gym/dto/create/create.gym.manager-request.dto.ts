import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
  
export class CreateGymManagerRequestDto {

  @ApiProperty({
    description: "Gym id",
    example: 235,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    description: "Applicant user id",
    example: 1235,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  applicantUserId: number;


  @ApiProperty({
    description: "Motivation letter",
    example: "Sample motivation letter",
    required: false,
  })
  @IsOptional()
  @IsString()
  letter: string;


  @ApiProperty({
    description: "Applicant's portfolio Url",
    example: "Sample motivation letter",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  portfolioUrl?: string;


  @ApiProperty({
    description: "Applicant's Document Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/gym/resume-applicant-00345.png",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  documentUrl?: string;


  @ApiProperty({
    description: "Whether application is favoriate",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  favorite?: boolean;


  @ApiProperty({
    description: "Whether application is accepted",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  accepted?: boolean;


  @ApiProperty({
    description: "Whether application is rejected",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsDate()
  rejected?: boolean;


  @ApiProperty({
    description: "Date application was accepted",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  acceptedDate?: Date;


  @ApiProperty({
    description: "Date application was rejected",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  rejectedDate?: Date;


  @ApiProperty({
    description: "Manager user id who accepted the application",
    example: 1223,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  acceptedByGymManagerUserId: number;


  @ApiProperty({
    description: "Manager user id who rejected the application",
    example: 1223,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  rejectedByGymManagerUserId: number;
}

