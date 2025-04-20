import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";


import { DetailsUserDto } from "@app/module/user/dto";
import { DetailsGymDto } from "@app/module/gym/dto";
import { GeoPointDto } from "@app/common/dto";

export class DetailsMapDto {

  @ApiProperty({
    type: 'number',
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    type: () => GeoPointDto,
    title: "GeoPointDto",
    description: "Users/Gym location",
    example: {
      type: 'Point',
      coordinates: [-123.456, 123.456]
    },
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => GeoPointDto)
  location: GeoPointDto;


  @ApiProperty({
    type: 'number',
    description: "Gym id",
    example: 1234,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    type: 'number',
    description: "User id",
    example: 23456,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  userId?: number;


  @ApiProperty({
    type: Date,
    description: "Record Date",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
    default: new Date(),
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;


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
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: "Gym details",
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsGymDto)
  gym?: DetailsGymDto;
}
