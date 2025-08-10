import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsBoolean, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsBaseWorkoutDto, DetailsBaseEquipmentDto, DetailsBaseUnitDto } from ".";

export class DetailsBaseWorkoutEquipmentDto {
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
    type: SwaggerType.INTEGER,
    description: "Workout ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  workoutId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Equipment ID",
    example: 5,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  equipmentId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Quantity of equipment needed",
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  quantity?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Quantity unit ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  quantityUnitId?: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether the equipment is mandatory for the workout",
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  mandatory: boolean;

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
    type: () => DetailsBaseWorkoutDto,
    description: "Workout details",
    required: true,
  })
  @ValidateNested()
  @Type(() => DetailsBaseWorkoutDto)
  workout: DetailsBaseWorkoutDto;

  @ApiProperty({
    type: () => DetailsBaseEquipmentDto,
    description: "Equipment details",
    required: true,
  })
  @ValidateNested()
  @Type(() => DetailsBaseEquipmentDto)
  equipment: DetailsBaseEquipmentDto;

  @ApiProperty({
    type: () => DetailsBaseUnitDto,
    description: "Quantity unit details",
    required: false,
  })
  @ValidateNested()
  @Type(() => DetailsBaseUnitDto)
  quantityUnit?: DetailsBaseUnitDto;
}
