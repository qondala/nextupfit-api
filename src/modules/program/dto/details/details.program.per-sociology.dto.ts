import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class DetailsProgramPerSociologyDto {

  @ApiProperty({
    type: Number,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    description: "Id of the program",
    example: 43354534,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  programId: number;


  @ApiProperty({
    description: "Id of the sociology",
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  baseSociologyId: number;
}
