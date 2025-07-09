import { SwaggerType } from "@app/common/types";
import { ApiProperty } from "@nestjs/swagger";

export class DetailsSocialRatingStatsDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    name: "totalReviews",
    description: "Total number of reviews",
    required: true
  })
  totalReviews: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    name: "averageRating",
    description: "Average rating of the item",
    required: true
  })
  averageRating: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    name: "items",
    isArray: true,
    description: "List of social ratings",
    required: true
  })
  items: number[];
}
