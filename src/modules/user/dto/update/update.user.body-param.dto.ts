import { IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

export class UpdateUserBodyParamDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "user id from whom the parameter is measured",
    example: 12345,
    required: false,
  })
  @IsInt()
  @IsOptional()
  userId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Value of the parameter",
    example: 12.5,
    required: false,
  })
  @IsInt()
  @IsOptional()
  bodyParamId?: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Value of the parameter",
    example: 12.5,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  paramValue?: number;
}
