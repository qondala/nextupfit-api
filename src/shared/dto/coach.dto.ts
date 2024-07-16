import { IsString, IsOptional } from "class-validator";

export class CoachDto {
  @IsString()
  bio: string;

  @IsString()
  @IsOptional()
  specialization: string;
}
