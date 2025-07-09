import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";


export class UpdateGymManagerQualificationDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager user id",
    example: 235,
    required: false,
  })
  @IsOptional()
  @IsInt()
  managerUserId?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Qualification name",
    example: "Certified Personal Trainer (CPT)",
    required: false,
  })
  @IsOptional()
  @IsString()
  qualificationName?: string;


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
    required: false,
  })
  @IsOptional()
  @IsInt()
  yearObtained?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Image of any document or manager's certificate",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/manager/docs/certificate.png",
    required: false,
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

