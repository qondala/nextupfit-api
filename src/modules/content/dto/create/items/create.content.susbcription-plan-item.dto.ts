import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { SwaggerType } from "@app/common/types";

export class CreateContentSusbcriptionPlanItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content subscription plan id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentSubscriptionPlanId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Title",
    example: "Premium feature",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description",
    example: "Detailed description for the feature",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Display description flag",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayDescription?: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Highlight flag",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  highlight?: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Strike flag",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  strike?: boolean;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Icon (URL or class)",
    example: "star",
    required: false,
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Italic flag",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  italic?: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Bold flag",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  bold?: boolean;
}
