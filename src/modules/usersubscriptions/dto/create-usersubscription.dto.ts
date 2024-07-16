import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserSubscriptionDto {
  @ApiProperty({ description: "ID du plan d'abonnement", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  planId: number;

  @ApiProperty({
    description: "Date de debut du plan d'abonnement",
    example: 1,
  })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({ description: "Date de fin du plan d'abonnement", example: 1 })
  @IsOptional()
  @IsDate()
  endDate?: Date;
}
