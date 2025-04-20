import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseWorkoutHowtoPerformStepDto } from "../create";


export class UpdateBaseWorkoutHowtoPerformStepDto extends PartialType(CreateBaseWorkoutHowtoPerformStepDto) {}

