import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import {
  DetailsProgramStepActivityWorkingsessionDto,
  DetailsProgramStepActivityWorkingsessionNutritionDto,
  DetailsProgramStepActivityWorkingsessionWorkoutDto
} from ".";

export class DetailsProgramStepActivityWorkingsessionPracticeDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record id",
    example: 1234,
    required: true,
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym",
    required: false,
  })
  gymId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program",
    required: false,
  })
  programId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    required: false,
  })
  programStepId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step activity",
    required: false,
  })
  programStepActivityId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the user owning the practice",
    required: false,
  })
  ownerUserId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the practice",
    required: false,
  })
  ownerManagerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the working session",
    required: false,
  })
  workingSessionId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program workout",
    required: false,
  })
  programWorkoutId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program nutrition",
    required: false,
  })
  programNutritionId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description:
      "Position of the practice inside the Program Activity Workingsession",
    required: false,
  })
  position?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Created at",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is the practice a challenge?",
    example: false,
    required: false,
  })
  isChallenge?: boolean;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Price of the challenge",
    required: false,
  })
  challengePrice?: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is the challenge public or restricted to program trail users?",
    example: true,
    required: false,
  })
  isPublicChallenge?: boolean;

  @ApiProperty({
    type: () => DetailsProgramStepActivityWorkingsessionDto,
    description: "Practice parent workingsession",
    required: false,
  })
  @Type(() => DetailsProgramStepActivityWorkingsessionDto)
  @ValidateNested()
  workingsession?: DetailsProgramStepActivityWorkingsessionDto;

  @ApiProperty({
    type: () => DetailsProgramStepActivityWorkingsessionWorkoutDto,
    description: "Practice underliying workout",
    required: false,
  })
  @Type(() => DetailsProgramStepActivityWorkingsessionWorkoutDto)
  @ValidateNested()
  workout?: DetailsProgramStepActivityWorkingsessionWorkoutDto;

  @ApiProperty({
    type: () => DetailsProgramStepActivityWorkingsessionNutritionDto,
    description: "Practice underliying nutrition",
    required: false,
  })
  @Type(() => DetailsProgramStepActivityWorkingsessionNutritionDto)
  @ValidateNested()
  nutrition?: DetailsProgramStepActivityWorkingsessionNutritionDto;
}
