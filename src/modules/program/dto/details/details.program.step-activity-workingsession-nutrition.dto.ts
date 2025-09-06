import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { DetailsBaseNutritionDto, DetailsBaseSociologyDto, DetailsBaseUnitDto } from "@app/module/base/dto";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class DetailsProgramStepActivityWorkingsessionNutritionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record id",
    example: 1234,
    required: true,
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Base nutrition's id",
    example: 12,
    required: false,
  })
  baseNutritionId?: number;

  
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the nutrition",
    example: 4335,
    required: true,
  })
  gymId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    example: 789,
    required: true,
  })
  programStepId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step activity",
    example: 45645,
    required: true,
  })
  programStepActivityId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the user owning the program nutrition",
    example: 4335,
    required: true,
  })
  ownerUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program nutrition",
    example: 4335,
    required: true,
  })
  ownerManagerId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition icon URL",
    required: false,
  })
  iconUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition image URL",
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition illustration URL",
    required: false,
  })
  illustrationUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition video URL",
    required: false,
  })
  videoUrl?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program session practice ID",
    required: false,
  })
  programSessionPracticeId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the nutrition session",
    required: false,
  })
  duration?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit id",
    required: false,
  })
  durationUnitId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Position of the nutrition inside the working session",
    required: false,
  })
  position?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition description",
    required: false,
  })
  description?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number times nutrition was rated",
    required: true,
  })
  ratingsCount: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrition attendees count",
    required: true,
  })
  attendeesCount: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    required: true,
  })
  viewsCount: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    required: true,
  })
  ratingsAvg: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Price of the nutrition",
    example: 0,
    required: false,
    default: 0,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number points gained after completing this nutrition",
    required: true,
  })
  points: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition title",
    required: false,
  })
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Created at",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Updated at",
    required: true,
  })
  updatedAt: Date;

  @ApiProperty({
    type: () => DetailsBaseSociologyDto,
    description: "Base nutrition",
    required: false,
  })
  @Type(() => DetailsBaseSociologyDto)
  baseNutrition?: DetailsBaseNutritionDto;

  @ApiProperty({
    type: () => DetailsBaseSociologyDto,
    description: "Nutrition duration unit",
    required: false,
  })
  @Type(() => DetailsBaseSociologyDto)
  durationUnit?: DetailsBaseUnitDto;
}
