import { PartialType } from "@nestjs/mapped-types";

import { CreateUserBodyParamDto } from "../create";

export class UpdateUserBodyParamDto extends PartialType(CreateUserBodyParamDto) {}
