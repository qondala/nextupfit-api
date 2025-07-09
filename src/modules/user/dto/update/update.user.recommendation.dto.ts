import { IsOptional, IsDate, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";


export class UpdateUserRecommendationDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recommended coach user Id",
    example: 11234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  recommendedManagerUserId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recommender user id",
    example: 11234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  recommenderUserId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recommendee user id",
    example: 11234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  recommendeeUserId?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Recommendation date",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  recommendationDate?: Date;
}

