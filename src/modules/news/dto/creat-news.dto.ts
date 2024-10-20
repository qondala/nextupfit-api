import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateNewsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  contentId: number;
}
