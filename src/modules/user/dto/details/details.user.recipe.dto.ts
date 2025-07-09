import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

export class DetailsUserRecipeDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record id",
    required: true,
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recipe id",
    required: true,
  })
  recipeId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content id",
    required: false,
  })
  contentId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Started at",
    required: false,
  })
  startedAt?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Finished at",
    required: false,
  })
  finishedAt?: Date;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    required: true,
  })
  userId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Created at",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Updated at",
    required: true,
  })
  updatedAt: Date;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program id",
    required: false,
  })
  programId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Step id",
    required: false,
  })
  stepId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Activity id",
    required: false,
  })
  activityId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Working session id",
    required: false,
  })
  workingSessionId?: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Completed",
    required: true,
  })
  completed: boolean;
}
