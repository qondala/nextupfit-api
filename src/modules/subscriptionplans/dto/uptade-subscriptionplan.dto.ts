import { IsOptional, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSubscriptionPlanDto {
  @ApiProperty({
    description: "Nom du plan d'abonnement",
    example: "Premium",
    required: false,
  })
  @IsOptional()
  @IsString()
  planName?: string;

  @ApiProperty({
    description: "Prix du plan d'abonnement",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: "Durée du plan d'abonnement en jours",
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  durationDays?: number;
}
