import { IsOptional, IsNumber, IsDate } from "class-validator";

export class UpdateUserNutritionDto {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsNumber()
  adherencePercentage?: number;
}
