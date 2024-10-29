import { IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  caochId: number;
}
