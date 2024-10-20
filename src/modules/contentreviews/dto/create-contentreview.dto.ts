import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateContentReviewDto {
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @IsNotEmpty()
  @IsNumber()
  @Optional()
  rating: number;

  @IsOptional()
  @IsString()
  reviewText?: string;
}
