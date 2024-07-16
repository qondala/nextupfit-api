import { IsOptional, IsNumber } from "class-validator";

export class UpdateRecommendationDto {
  @IsOptional()
  @IsNumber()
  recommendedCoachId?: number;

  @IsOptional()
  @IsNumber()
  recommendedToUserId?: number;
}
