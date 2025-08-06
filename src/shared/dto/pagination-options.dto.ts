import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsInt, Min, Max } from "class-validator";
import { SwaggerType } from "../types";

export class PaginationOptionsDto {
  @ApiPropertyOptional({
    description: "Page number (starts from 1)",
    default: 1,
    type: SwaggerType.INTEGER,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: "Number of items per page",
    default: 10,
    type: SwaggerType.INTEGER,
  })
  @IsOptional()
  @IsInt()
  @Max(100)
  @Min(1)
  limit: number = 10;
}
