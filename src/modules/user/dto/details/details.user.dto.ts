import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, ValidateNested } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { DetailsGymManagerDto } from "@app/module/gym/dto";
import { Type } from "class-transformer";


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
    type: SwaggerType.INTEGER,
    description: "User's manager account ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  managerAccountId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User's privilege level",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  privilegeLevel?: number;


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

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    title: "DetailsGymManagerDto",
    description: "Body param",
    required: false,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsGymManagerDto)
  managerAccount?: DetailsGymManagerDto;
}
