import { IsOptional, IsNumber, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSocialAffiliateProgramDto {

  @ApiProperty({
    description: "Commission rate",
    example: 30,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  commissionRate: number;


  @ApiProperty({
    description: "Sample description of the affiliation program",
    example: "Earn 15% commission on every sale of this strength training program.",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    description: "Id of the program",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programId?: number;


  @ApiProperty({
    description: "Id of the program activity",
    example: 56234,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programActivityId?: number;


  @ApiProperty({
    description: "Id of the activity working session",
    example: 76234,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programActivityWorkingsessionId?: number;
}
