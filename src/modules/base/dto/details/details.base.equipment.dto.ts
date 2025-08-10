import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsBaseEquipmentUsageDto } from ".";

export class DetailsBaseEquipmentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

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

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record creation timestamp",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record last update timestamp",
    required: true,
  })
  updatedAt: Date;

  @ApiProperty({
    type: () => DetailsBaseEquipmentUsageDto,
    description: "Equipment usage details",
    required: true,
  })
  @ValidateNested()
  @Type(() => DetailsBaseEquipmentUsageDto)
  usage: DetailsBaseEquipmentUsageDto;
}
