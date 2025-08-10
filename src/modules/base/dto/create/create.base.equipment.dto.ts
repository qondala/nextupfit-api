import { IsNotEmpty, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

export class CreateBaseEquipmentDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Equipment name",
    example: "Treadmill",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Equipment description",
    example: "Cardio equipment for running and walking exercises",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Equipment usage ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  usageId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Equipment image URL",
    example: "https://example.com/treadmill.jpg",
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
