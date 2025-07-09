import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class DetailsContentImageDto {
  @ApiProperty({ type: SwaggerType.INTEGER, example: 1, description: "record id" })
  @IsNumber()
  id: number;

  @ApiProperty({ type: SwaggerType.INTEGER, example: 11, description: "content id" })
  @IsInt()
  contentId: number;

  @ApiProperty({ type: SwaggerType.STRING, example: "Cover", required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: SwaggerType.STRING, example: "Description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, example: false, required: false })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;

  @ApiProperty({ type: SwaggerType.INTEGER, example: 321 })
  @IsNumber()
  imageUrl: number;

  @ApiProperty({ type: SwaggerType.INTEGER, example: 800, required: false })
  @IsOptional()
  @IsInt()
  height?: number;

  @ApiProperty({ type: SwaggerType.INTEGER, example: 600, required: false })
  @IsOptional()
  @IsInt()
  width?: number;
}
