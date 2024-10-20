// shared/dtos/bank-account.dto.ts
import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";

export enum BankAccountType {
  individual = "individual",
  company = "company",
}

export class BankAccountDto {
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  account_number: string;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  account_holder_type: BankAccountType;

  @IsOptional()
  @IsString()
  routing_number?: string;
}
