import { ApiProperty } from "@nestjs/swagger";
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseFoodProcessTypeEnum } from "../../types";
import { DetailsBaseFoodNutrientDto } from "./details.base.food-nutrient.dto";
import { Type } from "class-transformer";
import { DetailsBaseFoodGroupDto } from "./details.base.food-group.dto";

export class DetailsBaseFoodDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    description: "Food name",
    example: "Drip Coffee",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Food description",
    example:
      "Regular coffee often served black or with milk, cream, and sugar.",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: "Food illustration icon Url",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/drip-coffee.png",
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
    type: SwaggerType.INTEGER,
    description: "Food group ID. Example: 14 = Coffee drinks.",
    example: 14,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  foodGroupId: number;

  @ApiProperty({
    description:
      "Food unique code, meant to be used for app translation and other facilities.",
    example: "drip-coffee",
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    enum: BaseFoodProcessTypeEnum,
    enumName: "BaseFoodProcessTypeEnum",
    description: "Food processing type",
    example: BaseFoodProcessTypeEnum.raw,
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseFoodProcessTypeEnum)
  processType?: BaseFoodProcessTypeEnum;

  @ApiProperty({
    type: () => DetailsBaseFoodNutrientDto,
    isArray: true,
    title: "DetailsBaseFoodNutrientDto",
    description: "Food nutrients",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsBaseFoodNutrientDto)
  nutrients: DetailsBaseFoodNutrientDto[];

  @ApiProperty({
    type: () => DetailsBaseFoodGroupDto,
    title: "DetailsBaseFoodGroupDto",
    description: "Food group",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsBaseFoodGroupDto)
  foodGroup: DetailsBaseFoodGroupDto;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record creation timestamp",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record last update timestamp",
    required: true,
  })
  updatedAt: Date;
}
