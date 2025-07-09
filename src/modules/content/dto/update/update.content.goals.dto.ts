import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateContentGoalsDto {
  @ApiProperty({ type: SwaggerType.INTEGER, example: 123, description: "content id", required: false })
  @IsOptional()
  @IsInt()
  contentId?: number;

  @ApiProperty({ type: SwaggerType.STRING, example: "Morning routine", description: "title", required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: SwaggerType.STRING, example: "Goals description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, example: true, description: "display title", required: false })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;
}
