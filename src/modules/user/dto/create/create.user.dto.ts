import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsDate,
  IsBoolean,
  IsEnum,
  IsInt,
} from "class-validator";

import { UserProfileTypeEnum } from "../../types";
import { SwaggerType } from "@app/common/types";

export class CreateUserDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User's email",
    example: "test@example.com",
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User's first name",
    example: "John",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User's last name",
    example: "Doe",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Numero de telephone",
    example: "+1 (612) 508-8704",
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "User's birthdate",
    example: "2025-05-02",
    required: false,
  })
  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User's password",
    example: "Password123",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User's profile image URL",
    example: "https://example.com/profile-picture.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User's cover image URL",
    example: "https://example.com/profile-picture.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether user has confirmed successfully his email",
    example: true,
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "User last connexion",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  lastLogin?: Date;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User's age",
    example: 25,
    required: true,
  })
  @IsInt()
  age: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User's gender",
    example: 1,
    required: true,
  })
  @IsInt()
  gender: number;
}
