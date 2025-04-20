import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateBaseBodyParamDto {
  @ApiProperty({
    description: "Param name",
    example: "Weight",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    description: "Param description",
    example: "This param gives the person's weight in kg",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    description: "Unity id of the param. Example: 3 = kg",
    example: 3,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  unitId?: number;
}
