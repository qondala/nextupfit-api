import { PartialType } from "@nestjs/mapped-types";

import { CreateProgramStepActivityDto } from "../create";


export class UpdateProgramStepActivityDto extends PartialType(CreateProgramStepActivityDto) {}
