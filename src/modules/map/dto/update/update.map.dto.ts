
import { GeoPointDto } from "@app/common/dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';


export class UpdateMapDto {

  @ApiProperty({
    type: () => GeoPointDto,
    title: "GeoPointDto",
    description: "Users/Gym location",
    example: {
      type: 'Point',
      coordinates: [-123.456, 123.456]
    },
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => GeoPointDto)
  location?: GeoPointDto;


  @ApiProperty({
    type: Number,
    description: "Gym id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    type: Number,
    description: "User id",
    example: 23456,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({
    type: Number,
    description: "For userProfile column, we used a smallint type instead of user_profile_type_enum, in order to reduce table size when data grow. userProfile = 0 (Gym), 1(Manager), 2(Attendee)",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  userProfile?: number;
}

