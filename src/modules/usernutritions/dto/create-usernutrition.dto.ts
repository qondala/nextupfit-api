import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateUserNutritionDto {
  @IsNotEmpty()
  @IsNumber()
  nutritionProgramId: number;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsNumber()
  adherencePercentage?: number;
}
