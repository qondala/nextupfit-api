import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateContentImageDto {
  @ApiProperty({ type: SwaggerType.INTEGER, example: 1, description: "content id" })
  @IsInt()
  @IsNotEmpty()
  contentId: number;

  @ApiProperty({ type: SwaggerType.STRING, example: "Cover photo", required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ type: SwaggerType.STRING, example: "Description of image", required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, example: true, required: false })
  @IsBoolean()
  @IsOptional()
  displayTitle?: boolean;

  @ApiProperty({ type: SwaggerType.INTEGER, example: 123, description: "image file id" })
  @IsNumber()
  @IsNotEmpty()
  imageUrl: number;

  @ApiProperty({ type: SwaggerType.INTEGER, example: 800, required: false })
  @IsInt()
  @IsOptional()
  height?: number;

  @ApiProperty({ type: SwaggerType.INTEGER, example: 600, required: false })
  @IsInt()
  @IsOptional()
  width?: number;
}
