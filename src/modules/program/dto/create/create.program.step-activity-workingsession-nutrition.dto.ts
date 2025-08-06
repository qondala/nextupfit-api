import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

export class CreateProgramStepActivityWorkingsessionNutritionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Base nutrition's id",
    example: 12,
    required: false,
  })
  @IsOptional()
  @IsInt()
  baseNutritionId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the nutrition",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gymId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    example: 789,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  programStepId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step activity",
    example: 45645,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  programStepActivityId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the user owning the program nutrition",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ownerUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program nutrition",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ownerManagerId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition icon URL",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/nutrition/my-icon-001.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  iconUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition image URL",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/nutrition/my-nutrition-001.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition illustration URL",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/nutrition/my-illustration-001.gif",
    required: false,
  })
  @IsOptional()
  @IsString()
  illustrationUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition video URL",
    example:
      "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/steps/activities/nutrition/my-video-001.mp4",
    required: false,
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program session practice ID",
    example: 123456,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programSessionPracticeId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the nutrition session",
    example: 60,
    required: false,
  })
  @IsOptional()
  @IsInt()
  duration?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit id (e.g., minutes=1)",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  durationUnitId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Position of the nutrition inside the working session",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  position?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition description",
    example: "Here's a sample description of the nutrition plan",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number times nutrition was rated",
    example: 3000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ratingsCount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrition attendees count",
    example: 5000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  attendeesCount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    example: 1000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  viewsCount?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    example: 4.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number points gained after completing this nutrition",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  points?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition title",
    example: "Healthy Breakfast Plan",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;
}
