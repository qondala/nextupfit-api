import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

export class DetailsBaseFoodGroupDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the food group",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Food group name",
    example: "Coffee drinks",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Food group illustration icon Url",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/coffee-drinks.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User ID (Gym manager) that created the record",
    example: 1368464,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description:
      "Food group's unique code, meant to be used for app translation and other facilities.",
    example: "coffee-drinks",
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record creation timestamp",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record last update timestamp",
    required: true,
  })
  updatedAt: Date;
}
