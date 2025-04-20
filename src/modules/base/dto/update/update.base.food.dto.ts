import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseFoodDto } from "../create";


export class UpdateBaseFoodDto extends PartialType(CreateBaseFoodDto) {}
