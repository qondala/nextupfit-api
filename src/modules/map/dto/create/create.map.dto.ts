import { IsDefined, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

import { GeoPointDto } from "@app/common/dto";
  
export class CreateMapDto {

  @ApiProperty({
    type: () => GeoPointDto,
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
    type: 'number',
    description: "For userProfile column, we used a smallint type instead of user_profile_type_enum, in order to reduce table size when data grow. userProfile = 0 (Gym), 1(Manager), 2(Attendee)",
    example: 0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  userProfile?: number;
}
