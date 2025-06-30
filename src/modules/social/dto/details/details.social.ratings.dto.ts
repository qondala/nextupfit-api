import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { SocialReviewItemTypeEnum } from "../../types";
import { DetailsSocialReviewDto } from ".";


export class DetailsSocialRatingsDto {

  @ApiProperty({
    description: "Number of reviews",
    example: 10,
    required: true,
  })
  @IsNumber()
  count: number;


  @ApiProperty({
    description: "Average rating of the item",
    example: 3,
    required: true,
  })
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: "Minimum rating of the item",
    example: 1,
    required: true,
  })
  @IsNumber()
  minRating: number;


  @ApiProperty({
    description: "Maximum rating of the item",
    example: 5,
    required: true,
  })
  @IsNumber()
  maxRating: number;


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
    description: "Assess the ease of use of the Item on a scale of 10",
    example: 9,
    required: true,
  })
  @IsNumber()
  easeOfUse: number;


  @ApiProperty({
    description: "Assess the effectiveness of the Item on a scale of 10",
    example: 8,
    required: true,
  })
  @IsNumber()
  effectiveness: number;


  @ApiProperty({
    type: () => DetailsSocialReviewDto,
    isArray: true,
    description: "Reviews",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsSocialReviewDto)
  reviews: DetailsSocialReviewDto[];

}
