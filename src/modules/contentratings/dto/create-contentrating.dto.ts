import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateContentRatingDto {
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsNumber()
  easeOfUse?: number;

  @IsOptional()
  @IsNumber()
  effectiveness?: number;
}
