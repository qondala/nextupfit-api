import { IsDefined, IsInt, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

import { GeoPointDto } from "@app/common/dto";

export class CreateMapDto {
  @ApiProperty({
    type: () => GeoPointDto,
    description: "Users/Gym location",
    example: {
      type: "Point",
      coordinates: [-123.456, 123.456],
    },
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => GeoPointDto)
  location: GeoPointDto;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    example: 1234,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  gymId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager id",
    example: 23456,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  managerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager id",
    example: 23456,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  userId?: number;
}
