import { IsOptional, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserSubscriptionDto {
  @ApiProperty({
    description: "Date de début de l'abonnement",
    example: "2024-05-20",
    required: false,
  })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    description: "Date de fin de l'abonnement",
    example: "2024-06-20",
    required: false,
  })
  @IsOptional()
  @IsDate()
  endDate?: Date;
}
