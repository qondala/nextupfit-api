import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionPlanDto {
  @ApiProperty({ description: "Nom du plan d'abonnement", example: "Premium" })
  @IsNotEmpty()
  @IsString()
  planName: string;

  @ApiProperty({ description: "Prix du plan d'abonnement", example: 10 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: "Durée du plan d'abonnement en jours",
    example: 30,
  })
  @IsNotEmpty()
  @IsNumber()
  durationDays: number;
}
