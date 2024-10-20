import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";

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
    description: "Numero de telephone",
    example: "23765053248552",
  })
  @Optional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: "Date de naissance", example: "23-10-2003" })
  @Optional()
  @IsString()
  birthDate?: Date;

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

  @ApiProperty({
    description: "URL de l'image de profil",
    example: "https://example.com/profile-picture.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;
}
