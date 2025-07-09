

import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class DetailsBaseFoodDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record ID",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    description: "Food name",
    example: "Drip Coffee",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Food description",
    example: "Regular coffee often served black or with milk, cream, and sugar.",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: "Food illustration icon Url",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/drip-coffee.png",
    required: false
  })
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User ID (Gym manager) that created the record",
    example: 1368464,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Food group ID. Example: 14 = Coffee drinks.",
    example: 14,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  foodGroupId: number;

  @ApiProperty({
    description: "Food unique code, meant to be used for app translation and other facilities.",
    example: "drip-coffee",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record creation timestamp",
    required: true
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record last update timestamp",
    required: true
  })
  updatedAt: Date;
}

