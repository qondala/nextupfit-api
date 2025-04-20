import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
  
export class CreateGymManagerQualificationDto {
  @ApiProperty({
    description: "Manager user id",
    example: 235,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;


  @ApiProperty({
    description: "Qualification name",
    example: "Certified Personal Trainer (CPT)",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  qualificationName: string;


  @ApiProperty({
    description: "Institution name",
    example: "National Academy of Sports Medecine (NASM)",
    required: false,
  })
  @IsOptional()
  @IsString()
  institutionName?: string;


  @ApiProperty({
    description: "Year of obtention",
    example: 235,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  yearObtained?: number;


  @ApiProperty({
    description: "Image of any document or manager's certificate",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/manager/docs/certificate.png",
    required: true,
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
