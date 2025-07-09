import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateContentGoalsItemDto {
  @ApiProperty({ type: SwaggerType.INTEGER, description: "content goal block id", example: 1234, required: false })
  @IsOptional()
  @IsInt()
  contentId?: number;

  @ApiProperty({ type: SwaggerType.STRING, description: "title", example: "Goal title", required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: SwaggerType.STRING, description: "description", example: "Goal description", required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
