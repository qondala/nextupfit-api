import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class DetailsContentInformationDto {
  @ApiProperty({ type: SwaggerType.INTEGER, example: 1, description: "record id" })
  @IsInt()
  id: number;

  @ApiProperty({ type: SwaggerType.INTEGER, example: 11, description: "content id" })
  @IsInt()
  contentId: number;

  @ApiProperty({ type: SwaggerType.STRING, example: "Info title", required: false })
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
}
