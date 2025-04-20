import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseMealDto } from "../create";


export class UpdateBaseMealDto extends PartialType(CreateBaseMealDto) {}
