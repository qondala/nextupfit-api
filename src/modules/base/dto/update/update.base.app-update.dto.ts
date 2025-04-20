import { PartialType } from "@nestjs/mapped-types";

import { CreateBaseAppUpdateDto } from "../create";


export class UpdateBaseAppUpdateDto extends PartialType(CreateBaseAppUpdateDto) {}
