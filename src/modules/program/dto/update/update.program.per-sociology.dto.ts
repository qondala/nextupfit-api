import { PartialType } from "@nestjs/mapped-types";


import { CreateProgramPerSociologyDto } from "../create";

export class UpdateProgramPerSociologyDto extends PartialType(CreateProgramPerSociologyDto) {}
