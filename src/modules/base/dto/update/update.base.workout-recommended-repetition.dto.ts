import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseWorkoutRecommendedRepetitionDto } from "../create";


export class UpdateBaseWorkoutRecommendedRepetitionDto extends PartialType(CreateBaseWorkoutRecommendedRepetitionDto) {}
