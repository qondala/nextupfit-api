import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class CreateContentWarningDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "content id",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Warning title",
    description: "title",
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Warning description",
    description: "description",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    example: true,
    description: "display title",
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  displayTitle?: boolean;
}
