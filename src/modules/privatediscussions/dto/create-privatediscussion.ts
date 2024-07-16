import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePrivateDiscussionDto {
  @IsNotEmpty()
  @IsNumber()
  coachId: number;

  @IsOptional()
  @IsString()
  message?: string;
}
