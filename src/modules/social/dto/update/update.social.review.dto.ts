import { IsString, IsOptional, IsNumber, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SocialReviewItemTypeEnum } from "../../types";

export class UpdateSocialReviewDto {
  @ApiProperty({
    description: "User's rating on the item",
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;


  @ApiProperty({
    description: "Users's comment",
    example: "I really enjoyed attending Pillates workout session",
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;

 
  @ApiProperty({
    description: "Item type to be rated",
    example: SocialReviewItemTypeEnum.workingsession,
    required: false,
  })
  @IsOptional()
  @IsEnum(SocialReviewItemTypeEnum)
  itemType?: SocialReviewItemTypeEnum;

  @ApiProperty({
    description: "Item id to be rated",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  itemId?: number;

  @ApiProperty({
    description: "User id performing rating",
    example: 12342343,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  userId?: number;


  @ApiProperty({
    description: "Assess the ease of use of the Item on a scale of 10",
    example: 9,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  easeOfUse?: number;


  @ApiProperty({
    description: "Assess the effectiveness of the Item on a scale of 10",
    example: 8,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  effectiveness?: number;
}
