import { IsOptional, IsString } from "class-validator";

export class UpdateCoachSpecializationDto {
  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
