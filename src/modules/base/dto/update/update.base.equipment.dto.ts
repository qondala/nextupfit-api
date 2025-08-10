import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsInt, IsString } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateBaseEquipmentDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Equipment name",
    example: "Treadmill",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

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
    required: false,
  })
  @IsOptional()
  @IsInt()
  usageId?: number;

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
