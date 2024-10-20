import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCoachFollowDto {
  @IsNotEmpty()
  @IsNumber()
  coachId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
