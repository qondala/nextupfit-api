import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";


export class UpdateBaseSociologyGroupDto {

  @ApiProperty({
    description: "Sociology group's name",
    example: "Age Group",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    description: "Sociology group's description",
    example: "This sociology group is adapted for people of this age group",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    description: "Sociology group's code",
    example: "age-group",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;


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
