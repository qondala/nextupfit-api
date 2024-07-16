import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "Email de l'utilisateur",
    example: "test@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Prénom de l'utilisateur", example: "John" })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: "Nom de l'utilisateur", example: "Doe" })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
    example: "Password123",
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: "URL de l'image de profil",
    example: "https://example.com/profile-picture.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;
}
