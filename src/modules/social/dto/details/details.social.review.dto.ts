import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

import { SocialReviewItemTypeEnum } from "../../types";

export class DetailsSocialReviewDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User's rating on the item",
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  rating: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Users's comment",
    example: "I really enjoyed attending Pillates workout session",
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    enum: SocialReviewItemTypeEnum,
    enumName: "SocialReviewItemTypeEnum",
    description: "Item type to be rated",
    example: SocialReviewItemTypeEnum.workingsession,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(SocialReviewItemTypeEnum)
  itemType: SocialReviewItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id performing rating",
    example: 12342343,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Assess the ease of use of the Item on a scale of 10",
    example: 9,
    required: false,
  })
  @IsOptional()
  @IsInt()
  easeOfUse?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Assess the effectiveness of the Item on a scale of 10",
    example: 8,
    required: false,
  })
  @IsOptional()
  @IsInt()
  effectiveness?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Review creation date",
    example: "2025-08-08T20:57:49.000Z",
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
