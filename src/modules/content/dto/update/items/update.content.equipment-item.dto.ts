import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNumber,
  IsOptional,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateContentEquipmentItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "base equipment id",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  baseEquipmentId?: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    example: true,
    description: "mandatory",
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  mandatory?: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 456,
    description: "content equipment id",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  contentEquipmentId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 0,
    description: "position",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  position?: number;
}
