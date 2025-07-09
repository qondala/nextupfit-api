import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import {
  DetailsBaseNutritionDto,
  DetailsBaseProgramGoalDto,
  DetailsBaseSociologyDto,
  DetailsBaseWorkoutDto,
} from "@app/module/base/dto";


export class UserInterestCompositeDto {

  @ApiProperty({
    type: () => DetailsBaseSociologyDto,
    title: "DetailsBaseSociologyDto",
    description: "Sociology interest",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsBaseSociologyDto)
  sociology?: DetailsBaseSociologyDto;


  @ApiProperty({
    type: () => DetailsBaseNutritionDto,
    title: "DetailsBaseNutritionDto",
    description: "Nutrition interest",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsBaseNutritionDto)
  nutrition?: DetailsBaseNutritionDto;


  @ApiProperty({
    type: () => DetailsBaseWorkoutDto,
    title: "DetailsBaseWorkoutDto",
    description: "Workout interest",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsBaseWorkoutDto)
  workout?: DetailsBaseWorkoutDto;

  @ApiProperty({
    type: () => DetailsBaseProgramGoalDto,
    title: "DetailsBaseProgramGoalDto",
    description: "Program goal interest",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsBaseProgramGoalDto)
  programGoal?: DetailsBaseProgramGoalDto;
}

