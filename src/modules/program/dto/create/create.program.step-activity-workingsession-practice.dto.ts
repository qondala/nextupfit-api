import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional } from "class-validator";
import { SwaggerType } from "@app/common/types";
import { ProgramVisibilityEnum } from "../../types";

export class CreateProgramStepActivityWorkingsessionPracticeDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsInt()
  gymId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program",
    example: 80,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    example: 789,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programStepId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step activity",
    example: 45645,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programStepActivityId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the user owning the practice",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerUserId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the practice",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerManagerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the working session",
    example: 6789,
    required: false,
  })
  @IsOptional()
  @IsInt()
  workingSessionId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program workout",
    example: 123,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programWorkoutId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program nutrition",
    example: 456,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programNutritionId?: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is the practice a challenge?",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isChallenge?: boolean;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Price of the challenge",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  challengePrice?: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is the challenge public or restricted to program trail users?",
    example: true,
    required: false,
  })
  isPublicChallenge?: boolean;
}
