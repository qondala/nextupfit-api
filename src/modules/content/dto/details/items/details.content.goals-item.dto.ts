import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class DetailsContentGoalsItemDto {
  @ApiProperty({ type: SwaggerType.INTEGER, description: "record id", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ type: SwaggerType.INTEGER, description: "content goal block id", example: 1234 })
  @IsNotEmpty()
  @IsInt()
  contentId: number;

  @ApiProperty({ type: SwaggerType.STRING, description: "title", example: "Goal title" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: SwaggerType.STRING, description: "description", example: "Goal description" })
  @IsNotEmpty()
  @IsString()
  description: string;
}
