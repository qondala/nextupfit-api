import { PartialType } from "@nestjs/mapped-types";

import { CreateProgramStepActivityWorkingsessionWorkoutDto } from "../create";

export class UpdateProgramStepActivityWorkingsessionWorkoutDto extends PartialType(CreateProgramStepActivityWorkingsessionWorkoutDto) {}
