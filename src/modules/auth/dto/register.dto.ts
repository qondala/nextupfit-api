import { IsNotEmpty, IsString, IsEmail, IsOptional, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Optional } from "@nestjs/common";
import { SwaggerType } from "@app/common/types";

export class RegisterDto {
  @ApiProperty({
    description: "User's email",
    example: "test@example.com",
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
  @IsString()
  lastName: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User's birthdate",
    format: "date",
    example: "23-10-2003",
    required: false,
  })
  @Optional()
  @IsString()
  birthDate?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User's phone number",
    example: "52254515155155",
    required: false,
  })
  @Optional()
  @IsString()
  phoneNumber?: string;

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
    description: "URL of the profile image",
    example: "https://example.com/profile-picture.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;


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
