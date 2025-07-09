import { PartialType } from "@nestjs/swagger";
import { CreateContentRecipeDto } from "../create";

export class UpdateContentRecipeDto extends PartialType(CreateContentRecipeDto) {}
