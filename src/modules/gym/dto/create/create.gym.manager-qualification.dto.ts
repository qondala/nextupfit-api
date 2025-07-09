import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  IsUrl
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
  
export class CreateGymManagerQualificationDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager user id",
    example: 235,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  managerUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Qualification name",
    example: "Certified Personal Trainer (CPT)",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  qualificationName: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Institution name",
    example: "National Academy of Sports Medecine (NASM)",
    required: false,
  })
  @IsOptional()
  @IsString()
  institutionName?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Year of obtention",
    example: 235,
    required: true,
  })
  @IsOptional()
  @IsInt()
  yearObtained?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Image of any document or manager's certificate",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/manager/docs/certificate.png",
    required: true,
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
