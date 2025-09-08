import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, ValidateNested } from "class-validator";
import { SwaggerType } from "@app/common/types";
import { DetailsBaseUnitDto } from "./details.base.unit.dto";
import { Type } from "class-transformer";
import { DetailsBaseNutrientDto } from "./details.base.nutrient.dto";
import { DetailsBaseWorkoutDto } from "./details.base.workout.dto";

export class DetailsBaseWorkoutNutrientBurnDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Identifier",
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Related workout ID",
    example: 10,
  })
  @IsInt()
  baseWorkoutId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration value",
    example: 30,
  })
  @IsInt()
  duration: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit identifier",
    example: 2,
  })
  @IsInt()
  durationUnitId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient ID",
    example: 5,
  })
  @IsInt()
  nutrientId: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Quantity of nutrient burned",
    example: 200,
  })
  @IsNumber()
  burnsNutrientQty: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit identifier",
    example: 2,
  })
  @IsInt()
  burnsNutrientQtyUnitId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Creation timestamp",
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Last update timestamp",
  })
  updatedAt: Date;

  @ApiProperty({
    type: () => DetailsBaseUnitDto,
    description: "Duration unit",
    required: false,
  })
  @Type(() => DetailsBaseUnitDto)
  @ValidateNested()
  durationUnit: DetailsBaseUnitDto;

  @ApiProperty({
    type: () => DetailsBaseUnitDto,
    description: "Burnt nutrient quantity unit",
    required: true,
  })
  @Type(() => DetailsBaseUnitDto)
  @ValidateNested()
  burnsNutrientQtyUnit: DetailsBaseUnitDto;

  @ApiProperty({
    type: () => DetailsBaseNutrientDto,
    description: "Burnt nutrient",
    required: true,
  })
  @Type(() => DetailsBaseNutrientDto)
  @ValidateNested()
  nutrient: DetailsBaseNutrientDto;
}
