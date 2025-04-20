import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseUnitDto } from "../create";


export class UpdateBaseUnitDto extends PartialType(CreateBaseUnitDto) {}

