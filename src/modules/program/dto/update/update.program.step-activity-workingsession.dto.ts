import { PartialType } from "@nestjs/mapped-types";

import { CreateProgramStepActivityWorkingsessionDto } from "../create";

export class UpdateProgramStepActivityWorkingsessionDto extends PartialType(CreateProgramStepActivityWorkingsessionDto) {}
