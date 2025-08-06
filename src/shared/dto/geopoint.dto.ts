import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsNumber,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

export class GeoPointDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Constant value 'Point'",
    required: true,
    example: "Point",
    default: "Point",
  })
  @IsString()
  type: "Point";

  @ApiProperty({
    type: SwaggerType.NUMBER,
    isArray: true,
    description:
      "Array of 2 numbers representing the coordinates of the point: (longitude, latitude)",
    required: true,
    example: [-123.456, 123.456],
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates: number[];
}
