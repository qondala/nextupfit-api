import { IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProgressDto {
  @ApiProperty({ description: "ID de l'exercice", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  exerciseId: number;

  @ApiProperty({
    description: "Indique si l'exercice est terminé",
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
