import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsString } from "class-validator";


export class AuthTokenDto {
  @ApiProperty({
    description: "UUID received from Firebase",
    example: "---",
  })
  @IsDefined()
  @IsNumber()
  uid: number;

  @ApiProperty({
    description: "Access token",
    example: "---",
  })
  @IsDefined()
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: "Refresh token",
    example: "---",
  })
  @IsDefined()
  @IsString()
  refreshToken: string;
}
