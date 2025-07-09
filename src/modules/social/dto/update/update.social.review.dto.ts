import { IsString, IsOptional, IsInt, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { SocialReviewItemTypeEnum } from "../../types";

export class UpdateSocialReviewDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User's rating on the item",
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsInt()
  rating?: number;


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
    required: false,
  })
  @IsOptional()
  @IsEnum(SocialReviewItemTypeEnum)
  itemType?: SocialReviewItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id to be rated",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  itemId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id performing rating",
    example: 12342343,
    required: false,
  })
  @IsOptional()
  @IsInt()
  userId?: number;


  @ApiProperty({
    description: "Assess the ease of use of the Item on a scale of 10",
    example: 9,
    required: false,
  })
  @IsOptional()
  @IsInt()
  easeOfUse?: number;


  @ApiProperty({
    description: "Assess the effectiveness of the Item on a scale of 10",
    example: 8,
    required: false,
  })
  @IsOptional()
  @IsInt()
  effectiveness?: number;
}
