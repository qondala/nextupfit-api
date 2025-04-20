import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";

export class RegisterDto {
  @ApiProperty({
    description: "User's email",
    example: "test@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "User's first name", example: "John" })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: "User's last name", example: "Doe" })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: "User's birthdate", example: "23-10-2003" })
  @Optional()
  @IsString()
  birthDate?: Date;

  @ApiProperty({
    description: "User's phone number",
    example: "52254515155155",
  })
  @Optional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: "User's password",
    example: "Password123",
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: "URL of the profile image",
    example: "https://example.com/profile-picture.jpg",
  })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;
}
