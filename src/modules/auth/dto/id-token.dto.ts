import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IdTokenUserData } from "./id-token-user-data.dto";

export class IdTokenDto {
  @ApiProperty({
    description: "User's ID token",
  })
  @IsNotEmpty()
  idToken: string;

  @ApiProperty({
    description: "Basic user data obtained from firebase auth on client side",
  })
  @IsNotEmpty()
  userData: IdTokenUserData;
}
