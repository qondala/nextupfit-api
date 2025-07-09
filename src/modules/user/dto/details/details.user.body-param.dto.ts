import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { DetailsBaseBodyParamDto } from "@app/module/base/dto";
import { IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

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
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Created at",
    required: true,
  })
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Updated at",
    required: true,
  })
  updatedAt: Date;


  @ApiProperty({
    type: () => DetailsBaseBodyParamDto,
    title: "DetailsBaseBodyParamDto",
    description: "Body param",
    required: false,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsBaseBodyParamDto)
  bodyParam: DetailsBaseBodyParamDto;
}
