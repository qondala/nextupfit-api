import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRecommendationDto {
  @IsNotEmpty()
  @IsNumber()
  recommendedCoachId: number;

  @IsNotEmpty()
  @IsNumber()
  recommendedToUserId: number;
}
