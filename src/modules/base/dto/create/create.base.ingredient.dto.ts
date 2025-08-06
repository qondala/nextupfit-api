import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { BaseIngredientTypeEnum } from "../../types";

export class CreateBaseIngredientDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Ingredient name",
    example: "Organic Tomatoes",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Ingredient description",
    example: "Fresh organic tomatoes, perfect for salads and cooking.",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Ingredient image URL",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/tomatoes.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Brand name",
    example: "Green Valley Farms",
    required: false,
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({
    enum: BaseIngredientTypeEnum,
    enumName: "BaseIngredientTypeEnum",
    description: "Type of ingredient",
    example: BaseIngredientTypeEnum.ingredient,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseIngredientTypeEnum)
  type: BaseIngredientTypeEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    description:
      "Ingredient unique code, meant to be used for app translation and other facilities.",
    example: "organic-tomatoes",
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User ID (Gym manager) who created the ingredient record.",
    example: 1368464,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;
}
