import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseWorkoutNutrientBurnDto } from "../create";


export class UpdateBaseWorkoutNutrientBurnDto extends PartialType(CreateBaseWorkoutNutrientBurnDto) {}
  