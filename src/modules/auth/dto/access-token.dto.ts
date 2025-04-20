import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenDto {
  @ApiProperty({
    description: "Access token",
    example: "your_access_token",
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
