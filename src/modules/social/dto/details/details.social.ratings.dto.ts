import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

import { SocialReviewItemTypeEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class DetailsSocialRatingsDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the ratings record",
    example: 1234,
    required: true,
  })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({
     enum: SocialReviewItemTypeEnum,
     description: "Item type rated",
     required: true,
     example: SocialReviewItemTypeEnum.gym,
   })
   @IsEnum(SocialReviewItemTypeEnum)
   itemType: SocialReviewItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id to be rated",
    example: 1234,
    required: true,
  })
  @IsInt()
  itemId: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Average rating of the item",
    example: 3,
    required: true,
  })
  @IsNumber()
  averageRating: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Average ease of use of the item",
    example: 9,
    required: true,
  })
  @IsNumber()
  averageEaseOfUse: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Average effectiveness of the item",
    example: 8,
    required: true,
  })
  @IsNumber()
  averageEffectiveness: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Total number of reviews",
    example: 10,
    required: true,
  })
  @IsInt()
  totalReviews: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Minimum rating of the item",
    example: 1,
    required: true,
  })
  @IsInt()
  minRating: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Maximum rating of the item",
    example: 5,
    required: true,
  })
  @IsInt()
  maxRating: number;
}
