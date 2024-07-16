import { IsOptional, IsNumber, IsString } from "class-validator";

export class UpdateContentReviewDto {
  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsString()
  reviewText?: string;
}
