import { IsNumber } from 'class-validator';

export class LocationRadiusDto {

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  radius: number;
}
