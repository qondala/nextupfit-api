import { IsNotEmpty, IsOptional, IsDate, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";


export class CreateUserRecommendationDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recommended coach user Id",
    example: 11234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  recommendedManagerUserId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recommender user id",
    example: 11234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  recommenderUserId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recommendee user id",
    example: 11234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  recommendeeUserId: number;


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
