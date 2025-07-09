import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class DetailsContentImageDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "record id",
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 11,
    description: "content id",
    required: true,
  })
  @IsInt()
  contentId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Cover",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: true,
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 800,
    required: false,
  })
  @IsOptional()
  @IsInt()
  height?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 600,
    required: false,
  })
  @IsOptional()
  @IsInt()
  width?: number;
}
