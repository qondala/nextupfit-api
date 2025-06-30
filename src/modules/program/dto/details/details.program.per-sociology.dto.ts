import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
} from "class-validator";
import { ProgramItemTypeEnum } from "../../types";


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
    type: Number,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  itemType: ProgramItemTypeEnum;


  @ApiProperty({
    type: Number,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  itemId: number;


  @ApiProperty({
    description: "Id of the sociology",
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  baseSociologyId: number;
}
