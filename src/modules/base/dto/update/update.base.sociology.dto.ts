import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";



export class UpdateBaseSociologyDto {

  @ApiProperty({
    description: "Sociology's name",
    example: "seniors",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    description: "Sociology's description",
    example: "This program is suitable for senior people",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;



  @ApiProperty({
    description: "Sociology's code",
    example: "soc-seniors",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;


  @ApiProperty({
    description: "Base sociology group ID",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  baseSociologyGroupId: number;


  @ApiProperty({
    description: "Record created date",
    example: "2022-01-01T00:00:00.000Z",
    required: false
  })
  @IsOptional()
  @IsDate()
  createdAt: Date;


  @ApiProperty({
    description: "Record updated date",
    example: "2022-01-01T00:00:00.000Z",
    required: false
  })
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
 