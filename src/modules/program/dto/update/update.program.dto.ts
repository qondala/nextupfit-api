import { PartialType } from "@nestjs/mapped-types";

import { CreateProgramDto } from "../create";

export class UpdateProgramDto extends PartialType(CreateProgramDto) {}
