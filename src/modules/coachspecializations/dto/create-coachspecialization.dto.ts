import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateCoachSpecializationDto {
  @IsNotEmpty()
  @IsString()
  specialization: string;

  @IsOptional()
  @IsString()
  description?: string;
}
