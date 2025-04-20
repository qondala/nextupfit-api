import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseMealFoodDto } from "../create";


export class UpdateBaseMealFoodDto extends PartialType(CreateBaseMealFoodDto) {}
