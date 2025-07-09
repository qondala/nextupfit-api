import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";


export class DetailsUserRecommendationDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recommended manager user id",
    required: true,
  })
  recommendedManagerUserId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recommender user id",
    required: true,
  })
  recommenderUserId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recommendee user id",
    required: true,
  })
  recommendeeUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Recommendation created at",
    required: true,
  })
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Recommendation updated at",
    required: true,
  })
  updatedAt: Date;
}
