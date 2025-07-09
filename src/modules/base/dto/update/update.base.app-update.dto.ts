import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateBaseAppUpdateDto {

  @ApiProperty({
    description: "Update's version",
    example: "1.0.0",
    required: false
  })
  @IsOptional()
  @IsString()
  version?: string;


  @ApiProperty({
    description: "Version's name",
    example: "Starter",
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;


  @ApiProperty({
    description: "Text description of the verion's features",
    required: false,
  })
  @IsOptional()
  @IsString()
  features?: string;


  @ApiProperty({
    description: "Text description of the verion's changes",
    required: false,
  })
  @IsOptional()
  @IsString()
  changes?: string;
}

