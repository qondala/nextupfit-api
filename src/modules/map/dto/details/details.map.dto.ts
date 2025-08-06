import {
  IsDate,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { SwaggerType } from "@app/common/types";

import { DetailsUserDto } from "@app/module/user/dto";
import { DetailsGymDto } from "@app/module/gym/dto";
import { GeoPointDto } from "@app/common/dto";

import { DetailsGymManagerDto } from "@app/module/gym/dto";

export class DetailsMapDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: () => GeoPointDto,
    title: "GeoPointDto",
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
    example: 1234,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  managerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 23456,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Record Date",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
    default: new Date(),
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: "Gym details",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsGymDto)
  gym?: DetailsGymDto;

  @ApiProperty({
    type: () => DetailsUserDto,
    title: "DetailsUserDto",
    description: "User details",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsUserDto)
  user?: DetailsUserDto;

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    title: "DetailsGymManagerDto",
    description: "Gym manager details",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsGymManagerDto)
  manager?: DetailsGymManagerDto;
}
