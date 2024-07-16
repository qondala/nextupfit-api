import { IsOptional, IsNumber, IsString } from "class-validator";

export class UpdateCoachRatingDto {
  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
