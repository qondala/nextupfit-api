import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

export class DetailsBaseRecipeDto {
  @ApiProperty({
    type: SwaggerType.INTEGER
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING
  })
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false
  })
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false
  })
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  calories?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  protein?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  carbs?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  fat?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false
  })
  code?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  nbPersons?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  ownerManagerId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    required: false
  })
  createdAt?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    required: false
  })
  updatedAt?: Date;
}
