import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

export class DetailsUserBodyParamDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    required: true,
  })
  userId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Body param id",
    required: true,
  })
  bodyParamId: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Param value",
    required: true,
  })
  paramValue: number;


  @ApiProperty({
    type: SwaggerType.DATE,
    description: "Created at",
    required: true,
  })
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.DATE,
    description: "Updated at",
    required: true,
  })
  updatedAt: Date;
}
