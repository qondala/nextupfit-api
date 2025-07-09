import {
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { BaseMealTypeEnum } from "../../types";


export class CreateBaseMealDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Meal's name",
    example: "Plain standard cup of Drip Coffee",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    enum: BaseMealTypeEnum,
    enumName: "BaseMealTypeEnum",
    description: "Meal type",
    example: BaseMealTypeEnum.breakfast,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseMealTypeEnum)
  mealType: BaseMealTypeEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Meal's description",
    example: "This is a regular coffeee often served black or with milk, cream, and sugar.",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "UserId (Gym manager) who created the meal record.",
    example: 1368464,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Meal's unique code, meant to be used for app translation and other facilities.",
    example: "plain-standard-cup-of-drip-coffee",
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  code?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Meal illustration icon Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/plain-standard-cup-of-drip-coffee.png",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  iconUrl?: string;

  
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Meal's display order",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsInt()
  order?: number;
}
