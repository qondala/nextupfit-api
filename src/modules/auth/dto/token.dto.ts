import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
  @ApiProperty({ description: "Access token" })
  access_token: string;
}
