import { IsOptional, IsNumber, IsString } from "class-validator";

export class UpdateContentRatingDto {
  @IsOptional()
  @IsNumber()
  rating?: number;

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
