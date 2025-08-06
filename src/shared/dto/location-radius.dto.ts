import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class LocationRadiusDto {
  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Longitude of the location",
    required: true,
  })
  @IsNumber()
  longitude: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Latitude of the location",
    required: true,
  })
  latitude: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Radius in meters",
    required: true,
  })
  @IsNumber()
  radius: number;
}
