import { IsNotEmpty, IsNumber, IsOptional, IsDate } from "class-validator";

export class CreateUserChallengeDto {
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
