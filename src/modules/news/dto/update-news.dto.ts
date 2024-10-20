import { IsOptional, IsString } from "class-validator";

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  title?: string;
}
