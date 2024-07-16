import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCoachRatingDto {
  @IsNotEmpty()
  @IsNumber()
  coachId: number;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
