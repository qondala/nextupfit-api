import { IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateCoachQualificationDto {
  @IsOptional()
  @IsString()
  qualificationName?: string;

  @IsOptional()
  @IsString()
  institutionName?: string;

  @IsOptional()
  @IsNumber()
  yearObtained?: number;
}
