import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateContentImageDto {
  @ApiProperty({ type: SwaggerType.INTEGER, description: "content id", example: 1, required: false })
  @IsOptional()
  @IsInt()
  contentId?: number;

  @ApiProperty({ type: SwaggerType.STRING, example: "Cover photo", required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: SwaggerType.STRING, example: "Description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, example: true, required: false })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;

  @ApiProperty({ type: SwaggerType.INTEGER, description: "image file id", example: 55, required: false })
  @IsOptional()
  @IsNumber()
  imageUrl?: number;

  @ApiProperty({ type: SwaggerType.INTEGER, example: 800, required: false })
  @IsOptional()
  @IsInt()
  height?: number;

  @ApiProperty({ type: SwaggerType.INTEGER, example: 600, required: false })
  @IsOptional()
  @IsInt()
  width?: number;
}
