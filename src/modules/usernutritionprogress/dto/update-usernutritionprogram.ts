import { IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserNutritionProgressDto {
  @ApiProperty({
    description: "Apport calorique total",
    example: 2000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  caloriesIntake?: number;

  @ApiProperty({
    description: "Apport protéique total (en grammes)",
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  proteinIntake?: number;

  @ApiProperty({
    description: "Apport en glucides total (en grammes)",
    example: 200,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  carbsIntake?: number;

  @ApiProperty({
    description: "Apport en lipides total (en grammes)",
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  fatsIntake?: number;

  @ApiProperty({
    description: "Score d'adhésion au programme",
    example: 80,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  adherenceScore?: number;
}
