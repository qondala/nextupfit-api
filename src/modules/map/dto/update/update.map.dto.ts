import { GeoPointDto } from "@app/common/dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, ValidateNested } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateMapDto {
  @ApiProperty({
    type: () => GeoPointDto,
    title: "GeoPointDto",
    description: "Users/Gym location",
    example: {
      type: "Point",
      coordinates: [-123.456, 123.456],
    },
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => GeoPointDto)
  location?: GeoPointDto;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  gymId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager id",
    example: 23456,
    required: false,
  })
  @IsOptional()
  @IsInt()
  managerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 23456,
    required: false,
  })
  @IsOptional()
  @IsInt()
  userId?: number;
}
