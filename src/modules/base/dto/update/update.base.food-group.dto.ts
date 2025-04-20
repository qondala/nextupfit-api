import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseFoodGroupDto } from "../create";


export class UpdateBaseFoodGroupDto extends PartialType(CreateBaseFoodGroupDto) {}
