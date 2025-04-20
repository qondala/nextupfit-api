import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateBaseWorkoutNutrientBurnDto {

  @ApiProperty({
    description: "Workout id to be associated to nutrient burn",
    example: 13,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  baseWorkoutId: number;


  @ApiProperty({
    description: "Duration to be use when doing the ration between the workout and nutrient burn",
    example: 20,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;


  @ApiProperty({
    description: "Unity id to be use for the duration field; exple: 6 = mg/dL.",
    example: 6,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  durationUnitId: number;


  @ApiProperty({
    description: "Nutrient's burned during this workout; exple: 1 = Carbohydrate.",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  nutrientId: number;


  @ApiProperty({
    description: "Number nutrients burned by the workout in the time frame of duration. Exple: 30 means that the workouts burns 30 mg/dL per duration time.",
    example: 30,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  burnsNutrientQty: number;
}
  