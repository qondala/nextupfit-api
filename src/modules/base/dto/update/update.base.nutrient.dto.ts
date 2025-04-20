import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseNutrientDto } from "../create";


export class UpdateBaseNutrientDto extends PartialType(CreateBaseNutrientDto) {}

