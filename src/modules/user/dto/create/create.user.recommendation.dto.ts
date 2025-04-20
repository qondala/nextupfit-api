import { IsNotEmpty, IsOptional, IsDate, IsEnum, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserRecommendationDto {

  @ApiProperty({
    description: "Recommended coach user Id",
    example: 11234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  recommendedManagerUserId: number;


  @ApiProperty({
    description: "Recommender user id",
    example: 11234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  recommenderUserId: number;


  @ApiProperty({
    description: "Recommendee user id",
    example: 11234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  recommendeeUserId: number;


  @ApiProperty({
    description: "Recommendation date",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  recommendationDate?: Date;
}
