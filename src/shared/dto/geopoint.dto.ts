import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayMinSize, ArrayMaxSize, IsNumber } from 'class-validator';

export class GeoPointDto {
  @ApiProperty({
    type: String,
    description: "Constant value 'Point'",
    required: true,
    example: 'Point'
  })
  @IsString()
  type: 'Point';

  @ApiProperty({
    type: Number,
    description: "Array of 2 numbers representing the coordinates of the point: (longitude, latitude)",
    required: true,
    example: [-123.456, 123.456]
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates: number[];
}
