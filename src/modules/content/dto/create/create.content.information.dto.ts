import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class CreateContentInformationDto {
  @ApiProperty({ type: SwaggerType.INTEGER, example: 1, description: "content id" })
  @IsInt()
  @IsNotEmpty()
  contentId: number;

  @ApiProperty({ type: SwaggerType.STRING, example: "Info title", required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ type: SwaggerType.STRING, example: "Description", required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, example: true, required: false })
  @IsBoolean()
  @IsOptional()
  displayTitle?: boolean;
}
