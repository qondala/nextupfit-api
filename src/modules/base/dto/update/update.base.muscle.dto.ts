import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseMuscleDto } from "../create";    


export class UpdateBaseMuscleDto extends PartialType(CreateBaseMuscleDto) {}
