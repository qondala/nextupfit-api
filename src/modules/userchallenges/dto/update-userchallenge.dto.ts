import { IsOptional, IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateUserChallengeDto {
  @IsNotEmpty()
  @IsNumber()
  challengeId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsDate()
  startDate?: Date;
}
