import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
  @ApiProperty({ description: "Token d'accès" })
  access_token: string;
}
