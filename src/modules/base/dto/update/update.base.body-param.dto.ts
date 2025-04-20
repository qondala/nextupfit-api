import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseBodyParamDto } from "../create";


export class UpdateBaseBodyParamDto extends PartialType(CreateBaseBodyParamDto) {}
