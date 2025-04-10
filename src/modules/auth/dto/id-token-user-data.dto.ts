import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class IdTokenUserData {

  @ApiProperty({
    description: "User's email",
    example: "test@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

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
