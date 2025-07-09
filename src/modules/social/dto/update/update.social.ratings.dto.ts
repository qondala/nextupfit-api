import { SwaggerType } from "@app/common/types";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateSocialRatingsDto {

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Average rating of the item",
    example: 3,
    required: false,
  })
  averageRating?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Average ease of use of the item",
    example: 9,
    required: false,
  })
  averageEaseOfUse?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Average effectiveness of the item",
    example: 8,
    required: false,
  })
  averageEffectiveness?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Total number of reviews",
    example: 10,
    required: false,
  })
  totalReviews?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Minimum rating of the item",
    example: 1,
    required: false,
  })
  minRating?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Maximum rating of the item",
    example: 5,
    required: false,
  })
  maxRating?: number;
}
