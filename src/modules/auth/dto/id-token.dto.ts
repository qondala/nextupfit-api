import { IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class IdTokenDto {
  @ApiProperty({
    description: "User's ID token",
  })
  @IsNotEmpty()
  idToken: string;
}
