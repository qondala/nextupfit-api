import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
} from "class-validator";

export class UpdateProgramPerSociologyDto {

  @ApiProperty({
    description: "Id of the program",
    example: 43354534,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programId?: number;


  @ApiProperty({
    description: "Id of the sociology",
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  baseSociologyId?: number;
}

