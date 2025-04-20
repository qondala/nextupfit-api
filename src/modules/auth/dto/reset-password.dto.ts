import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
  @ApiProperty({
    description: "User's email",
    example: "test@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Token for password reinitialization",
    example: "your_reset_token",
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ description: "New password", example: "Password123" })
  @IsNotEmpty()
  @IsString()
  password: string;
}
