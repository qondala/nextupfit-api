import { PartialType } from "@nestjs/mapped-types";

import { CreateProgramActivityContentDto } from "../create";

export class UpdateProgramActivityContentDto extends PartialType(CreateProgramActivityContentDto) {}
