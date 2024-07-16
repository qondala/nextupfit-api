import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAffiliateLinkDto {
  @ApiProperty({ description: "ID du programme d'affiliation", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  affiliateProgramId: number;
}
