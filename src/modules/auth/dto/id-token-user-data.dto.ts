import { IsNotEmpty, IsString, IsEmail, IsOptional, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class IdTokenUserData {

  @ApiProperty({
    description: "User's email",
    example: "test@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Wether user's email is verified",
  })
  @IsNotEmpty()
  @IsBoolean()
  emailVerified: boolean;

  @ApiProperty({ description: "User's first name", example: "John" })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ description: "User's last name", example: "Doe" })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ description: "User's profile image URL"})
  @IsOptional()
  @IsString()
  profileImageUrl: string;
}
