import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyEmailDto {
  @ApiProperty({
    description: "Verification token of the email",
    example: "your_verification_token",
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
