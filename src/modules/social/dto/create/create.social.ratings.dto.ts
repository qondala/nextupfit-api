import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

import { SocialReviewItemTypeEnum } from "../../types";


export class CreateSocialRatingsDto {

  @ApiProperty({
    description: "Item type to be rated",
    example: SocialReviewItemTypeEnum.workingsession,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(SocialReviewItemTypeEnum)
  itemType: SocialReviewItemTypeEnum;

  @ApiProperty({
    description: "Item id to be rated",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @ApiProperty({
    description: "Average rating of the item",
    example: 3,
    required: true,
  })
  averageRating: number;

  @ApiProperty({
    description: "Average ease of use of the item",
    example: 9,
    required: true,
  })
  averageEaseOfUse: number;

  @ApiProperty({
    description: "Average effectiveness of the item",
    example: 8,
    required: true,
  })
  averageEffectiveness: number;

  @ApiProperty({
    description: "Total number of reviews",
    example: 10,
    required: true,
  })
  totalReviews: number;

  @ApiProperty({
    description: "Minimum rating of the item",
    example: 1,
    required: true,
  })
  minRating: number;

  @ApiProperty({
    description: "Maximum rating of the item",
    example: 5,
    required: true,
  })
  maxRating: number;
}
