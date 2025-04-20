import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, IsEnum } from "class-validator";

import { UserProfileTypeEnum } from "../../types";


export class DetailsUserDto {

  @ApiProperty({
    type: Number,
    description: "record id",
    required: true,
  })
  id: number;


  @ApiProperty({
    type: String,
    description: "User email",
    required: true,
  })
  email: string;


  @ApiProperty({
    type: String,
    description: "User first name",
    required: true,
  })
  firstName: string;


  @ApiProperty({
    type: String,
    description: "User last name",
    required: false,
  })
  lastName?: string;


  @ApiProperty({
    type: String,
    description: "User phone number",
    required: false,
  })
  phoneNumber?: string;


  @ApiProperty({
    type: Date,
    description: "User birth date",
    example: "2025-05-02",
    required: false,
  })
  birthDate?: Date;


  @ApiProperty({
    type: String,
    description: "User password hash",
    required: false,
  })
  passwordHash?: string;


  @ApiProperty({
    type: String,
    description: "User profile image url",
    required: false,
  })
  profileImageUrl?: string;


  @ApiProperty({
    type: String,
    description: "User cover image url",
    required: false,
  })
  coverImageUrl?: string;


  @ApiProperty({
    type: Boolean,
    description: "User email verified",
    required: true,
  })
  isEmailVerified: boolean;


  @ApiProperty({
    type: Date,
    description: "User last login",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  lastLogin?: Date;


  @ApiProperty({
    enum: UserProfileTypeEnum,
    enumName: "UserProfileTypeEnum",
    isArray: true,
    description: "User profile",
    required: true,
    example: Object.values(UserProfileTypeEnum),
  })
  @IsDefined()
  @IsArray()
  @IsEnum(UserProfileTypeEnum, { each: true })
  userProfile: UserProfileTypeEnum[];


  @ApiProperty({
    type: Date,
    description: "User created at",
    required: false,
    example: "2025-05-02T00:00:00.000Z",
  })
  createdAt?: Date;


  @ApiProperty({
    type: Date,
    description: "User updated at",
    required: false,
    example: "2025-05-02T00:00:00.000Z",
  })
  updatedAt?: Date;
}
