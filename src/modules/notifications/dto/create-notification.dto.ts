import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
