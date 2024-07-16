import { IsOptional, IsDate, IsString } from "class-validator";

export class UpdateUserProgramDto {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  programStatus?: "active" | "completed" | "paused";
}
