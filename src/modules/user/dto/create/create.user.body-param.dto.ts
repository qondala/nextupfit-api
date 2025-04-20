import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserBodyParamDto {

  @ApiProperty({
    description: "user id from whom the parameter is measured",
    example: 12345,
    required: true,
  })
  @IsNumber()
  userId: number;


  @ApiProperty({
    description: "Value of the parameter",
    example: 12.5,
    required: true,
  })
  @IsNumber()
  bodyParamId: number;


  @ApiProperty({
    description: "Value of the parameter",
    example: 12.5,
    required: true,
  })
  @IsNumber()
  paramValue: number;
}
