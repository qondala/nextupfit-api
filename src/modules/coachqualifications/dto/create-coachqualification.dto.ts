import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateCoachQualificationDto {
  @IsNotEmpty()
  @IsString()
  qualificationName: string;

  @IsOptional()
  @IsString()
  institutionName?: string;

  @IsOptional()
  @IsNumber()
  yearObtained?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
