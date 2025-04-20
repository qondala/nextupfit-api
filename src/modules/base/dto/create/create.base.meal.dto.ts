import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseMealTypeEnum } from "../../types";


export class CreateBaseMealDto {

  @ApiProperty({
    description: "Meal's name",
    example: "Plain standard cup of Drip Coffee",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    description: "Meal type",
    example: BaseMealTypeEnum.breakfast,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseMealTypeEnum)
  mealType: BaseMealTypeEnum;


  @ApiProperty({
    description: "Meal's description",
    example: "This is a regular coffeee often served black or with milk, cream, and sugar.",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({
    description: "UserId (Gym manager) who created the meal record.",
    example: 1368464,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  createdByUserId: number;


  @ApiProperty({
    description: "Meal's unique code, meant to be used for app translation and other facilities.",
    example: "plain-standard-cup-of-drip-coffee",
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  code?: string;


  @ApiProperty({
    description: "Meal illustration icon Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/plain-standard-cup-of-drip-coffee.png",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  iconUrl?: string;

  
  @ApiProperty({
    description: "Meal's display order",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  order?: number;
}
