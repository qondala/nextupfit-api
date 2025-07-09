import { SwaggerType } from "@app/common/types";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsInt
} from "class-validator";


export class UpdateProgramWorkoutNutrientBurnDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workout id to be associated to nutrient burn",
    example: 13,
    required: false
  })
  @IsOptional()
  @IsInt()
  baseWorkoutId?: number;
  

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration to be use when doing the ration between the workout and nutrient burn",
    example: 20,
    required: false
  })
  @IsOptional()
  @IsInt()
  duration?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unity id to be use for the duration field; exple: 6 = mg/dL.",
    example: 6,
    required: false
  })
  @IsOptional()
  @IsInt()
  durationUnitId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient's burned during this workout; exple: 1 = Carbohydrate.",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsInt()
  nutrientId?: number;
  

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number nutrients burned by the workout in the time frame of duration. Exple: 30 means that the workouts burns 30 mg/dL per duration time.",
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsInt()
  burnsNutrientQty?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the Workingession",
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
    description: "Id of the program step acitivity",
    example: 45645,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programStepActivityId?: number;
  
  
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program workout",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerUserId?: number;
}

