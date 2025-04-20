import { PartialType } from "@nestjs/mapped-types";

import { CreateProgramStepDto } from "../create";

export class UpdateProgramStepDto extends PartialType(CreateProgramStepDto) {}
