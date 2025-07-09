import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

export class CreateContentEquipmentItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "base equipment id",
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  baseEquipmentId: number;

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
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  contentEquipmentId: number;

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
