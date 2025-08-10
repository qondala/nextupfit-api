import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsInt, IsBoolean } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateBaseWorkoutEquipmentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workout ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  workoutId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Equipment ID",
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  equipmentId?: number;

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
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  mandatory?: boolean;
}
