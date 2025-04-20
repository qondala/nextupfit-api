import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseFoodNutrientsDto } from "../create";


export class UpdateBaseFoodNutrientsDto extends PartialType(CreateBaseFoodNutrientsDto) {}
