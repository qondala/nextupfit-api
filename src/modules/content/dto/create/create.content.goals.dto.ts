import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class CreateContentGoalsDto {
  @ApiProperty({ type: SwaggerType.INTEGER, example: 1, description: "content id" })
  @IsNumber()
  @IsNotEmpty()
  contentId: number;

  @ApiProperty({ type: SwaggerType.STRING, example: "Daily habits", description: "title" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: SwaggerType.STRING, example: "List of daily goals.", description: "description", required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, example: true, description: "display title", required: false })
  @IsBoolean()
  @IsOptional()
  displayTitle?: boolean;
}
