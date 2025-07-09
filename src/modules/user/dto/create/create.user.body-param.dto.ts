import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

export class CreateUserBodyParamDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "user id from whom the parameter is measured",
    example: 12345,
    required: true,
  })
  @IsNumber()
  userId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Value of the parameter",
    example: 12.5,
    required: true,
  })
  @IsNumber()
  bodyParamId: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Value of the parameter",
    example: 12.5,
    required: true,
  })
  @IsNumber()
  paramValue: number;
}
