import { PartialType } from "@nestjs/mapped-types";

import { CreateUserProgramEvolutionEventDto } from "../create";

export class UpdateUserProgramEvolutionDto extends PartialType(CreateUserProgramEvolutionEventDto) {}
