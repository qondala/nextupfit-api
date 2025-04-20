import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateBaseAppUpdateDto {

  @ApiProperty({
    description: "Update's version",
    example: "1.0.0",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  version: string;


  @ApiProperty({
    description: "Version's name",
    example: "Starter",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    description: "Text description of the verion's features",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  features: string;
}
