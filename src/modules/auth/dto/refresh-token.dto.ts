import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
  @ApiProperty({
    description: "Refresh token",
    example: "your_refresh_token",
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
