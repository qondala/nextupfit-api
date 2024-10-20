import { IsOptional, IsNumber, IsString } from "class-validator";

export class UpdateCoachFollowDto {
  @IsOptional()
  @IsNumber()
  coachId?: number;

  @IsOptional()
  @IsString()
  userId?: string;
}
