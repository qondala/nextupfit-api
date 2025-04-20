import { IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto {
  @ApiProperty({
    description: "User's email",
    example: "test@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
