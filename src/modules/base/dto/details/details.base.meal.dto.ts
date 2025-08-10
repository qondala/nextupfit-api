import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";

import { BaseMealTypeEnum } from "../../types";
import { DetailsBaseMealFoodDto } from ".";

export class DetailsBaseMealDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "Record identifier",
  })
  @IsInt()
  id: number;

  @ApiProperty({
    example: "Plain standard cup of Drip Coffee",
    description: "Meal's name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: BaseMealTypeEnum,
    enumName: "BaseMealTypeEnum",
    example: BaseMealTypeEnum.breakfast,
    description: "Meal type",
  })
  @IsEnum(BaseMealTypeEnum)
  mealType: BaseMealTypeEnum;

  @ApiProperty({
    example: "This is a regular coffee served black.",
    description: "Meal's description",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123456,
    description: "User ID that created the meal",
  })
  @IsInt()
  createdByUserId: number;

  @ApiProperty({
    example: "plain-standard-cup-of-drip-coffee",
    description: "Unique code",
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    example: "https://cdn.example.com/meal.png",
    description: "Icon URL",
    required: false,
  })
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "Display order",
    required: false,
  })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({
    type: () => DetailsBaseMealFoodDto,
    isArray: true,
    description: "Meal foods",
    required: false,
  })
  @IsOptional()
  @Type(() => DetailsBaseMealFoodDto)
  @ValidateNested({ each: true })
  mealFoods?: DetailsBaseMealFoodDto[];
}
