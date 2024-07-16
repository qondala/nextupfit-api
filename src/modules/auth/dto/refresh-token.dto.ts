import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
  @ApiProperty({
    description: "Token de rafraîchissement",
    example: "your_refresh_token",
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
