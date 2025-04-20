import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class CardDto {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsNumber()
  exp_month: number;

  @IsNotEmpty()
  @IsNumber()
  exp_year: number;

  @IsNotEmpty()
  @IsString()
  cvc: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address_line1?: string;

  @IsOptional()
  @IsString()
  address_line2?: string;

  @IsOptional()
  @IsString()
  address_city?: string;

  @IsOptional()
  @IsString()
  address_state?: string;

  @IsOptional()
  @IsString()
  address_zip?: string;

  @IsOptional()
  @IsString()
  address_country?: string;
}
