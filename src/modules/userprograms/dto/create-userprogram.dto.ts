import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
} from "class-validator";

export class CreateUserProgramDto {
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

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
