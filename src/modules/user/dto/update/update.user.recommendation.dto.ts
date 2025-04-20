import { PartialType } from "@nestjs/mapped-types";
import { CreateUserRecommendationDto } from "../create";

export class UpdateUserRecommendationDto extends PartialType(CreateUserRecommendationDto) {}
