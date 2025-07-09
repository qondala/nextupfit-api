import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class CreateContentInstructionsDto {
  @ApiProperty({ type: SwaggerType.INTEGER, example: 1, description: "content id", required: false })
  @IsOptional()
  @IsInt()
  contentId?: number;

  @ApiProperty({ type: SwaggerType.STRING, example: "Instruction title", required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: SwaggerType.STRING, example: "Steps description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, example: true, required: false })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;
}
