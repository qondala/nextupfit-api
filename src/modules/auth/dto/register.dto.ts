import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";

export class RegisterDto {
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

  @ApiProperty({ description: "Date de naissance", example: "23-10-2003" })
  @Optional()
  @IsString()
  birthDate?: Date;

  @ApiProperty({
    description: "Numero de telephone",
    example: "52254515155155",
  })
  @Optional()
  @IsString()
  phoneNumber?: string;

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
  })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;
}
