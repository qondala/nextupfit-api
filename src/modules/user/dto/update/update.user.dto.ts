import { IsNotEmpty, IsString, IsEmail, IsOptional, IsArray, IsDate, IsBoolean, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserProfileTypeEnum } from "../../types";

export class UpdateUserDto {

  @ApiProperty({
    type: String,
    description: "User's email",
    example: "test@example.com",
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;


  @ApiProperty({
    type: String,
    description: "User's first name",
    example: "John",
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;


  @ApiProperty({
    type: String,
    description: "User's last name",
    example: "Doe",
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;


  @ApiProperty({
    type: String,
    description: "Numero de telephone",
    example: "+1 (612) 508-8704",
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;


  @ApiProperty({
    type: Date,
    description: "User's birthdate",
    example: "2025-05-02",
    required: false,
  })
  @IsOptional()
  @IsDate()
  birthDate?: Date;


  @ApiProperty({
    type: String,
    description: "User's password",
    example: "Password123",
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;


  @ApiProperty({
    type: String,
    description: "User's profile image URL",
    example: "https://example.com/profile-picture.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;


  @ApiProperty({
    type: String,
    description: "User's cover image URL",
    example: "https://example.com/profile-picture.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  coverImageUrl?: string;


  @ApiProperty({
    type: Boolean,
    description: "Whether user has confirmed successfully his email",
    example: true,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @ApiProperty({
    type: Date,
    description: "User last connexion",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  lastLogin?: Date;


  @ApiProperty({
    enum: UserProfileTypeEnum,
    enumName: "UserProfileTypeEnum",
    isArray: true,
    description: "User's profile types",
    example: Object.keys(UserProfileTypeEnum),
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(UserProfileTypeEnum, { each: true })
  userProfile?: UserProfileTypeEnum[];
}
