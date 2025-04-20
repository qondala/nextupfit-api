import { PartialType } from "@nestjs/mapped-types";

import { CreateProgramWorkoutNutrientBurnDto } from "../create";

export class UpdateProgramWorkoutNutrientBurnDto extends PartialType(CreateProgramWorkoutNutrientBurnDto) {}
