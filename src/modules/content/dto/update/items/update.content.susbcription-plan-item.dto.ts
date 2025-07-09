import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateContentSusbcriptionPlanItemDto {
  @ApiProperty({ type: SwaggerType.INTEGER, description: "Content subscription plan id", required: false })
  @IsOptional()
  @IsInt()
  contentSubscriptionPlanId?: number;

  @ApiProperty({ type: SwaggerType.STRING, description: "Title", required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: SwaggerType.STRING, description: "Description", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, description: "Display description", required: false })
  @IsOptional()
  @IsBoolean()
  displayDescription?: boolean;

  @ApiProperty({ type: SwaggerType.BOOLEAN, description: "Highlight", required: false })
  @IsOptional()
  @IsBoolean()
  highlight?: boolean;

  @ApiProperty({ type: SwaggerType.BOOLEAN, description: "Strike", required: false })
  @IsOptional()
  @IsBoolean()
  strike?: boolean;

  @ApiProperty({ type: SwaggerType.STRING, description: "Icon", required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ type: SwaggerType.BOOLEAN, description: "Italic", required: false })
  @IsOptional()
  @IsBoolean()
  italic?: boolean;

  @ApiProperty({ type: SwaggerType.BOOLEAN, description: "Bold", required: false })
  @IsOptional()
  @IsBoolean()
  bold?: boolean;
}
