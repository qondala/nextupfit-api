import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSocialAffiliateSaleDto {
  @ApiProperty({
    description: "Sale amount",
    example: 1000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  saleAmount: number;


  @ApiProperty({
    description: "Commission earned",
    example: 30,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  commissionEarned: number;


  @ApiProperty({
    description: "Affiliate link id",
    example: 12345,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  affiliateLinkId: string;
}
