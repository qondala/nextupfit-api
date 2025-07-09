import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

export class DetailsContentPrerequisitesDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "record id",
  })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "content id",
    required: false,
  })
  @IsInt()
  @IsOptional()
  contentId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Prerequisites title",
    description: "title",
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Prerequisites description",
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
