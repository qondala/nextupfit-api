import { IsOptional, IsNumber } from "class-validator";

export class UpdateTrainingSessionDto {
  @IsOptional()
  @IsNumber()
  attended?: boolean;
}
