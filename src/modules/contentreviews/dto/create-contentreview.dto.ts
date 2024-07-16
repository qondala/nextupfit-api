import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateContentReviewDto {
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  reviewText?: string;
}
