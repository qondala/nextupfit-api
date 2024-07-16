import { IsOptional, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProgressDto {
  @ApiProperty({
    description: "Indique si l'exercice est terminé",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
