import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, IsEnum } from "class-validator";

import { UserProfileTypeEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class DetailsUserDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  id: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User email",
    required: true,
  })
  email: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User first name",
    required: true,
  })
  firstName: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User last name",
    required: false,
  })
  lastName?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User phone number",
    required: false,
  })
  phoneNumber?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "User birth date",
    example: "2025-05-02",
    required: false,
  })
  birthDate?: Date;



  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User profile image url",
    required: false,
  })
  profileImageUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "User cover image url",
    required: false,
  })
  coverImageUrl?: string;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "User email verified",
    required: true,
  })
  isEmailVerified: boolean;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
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
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "User created at",
    required: false,
    example: "2025-05-02T00:00:00.000Z",
  })
  createdAt?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "User updated at",
    required: false,
    example: "2025-05-02T00:00:00.000Z",
  })
  updatedAt?: Date;
}
