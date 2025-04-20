import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateBaseFoodDto {

  @ApiProperty({
    description: "Food name",
    example: "Drip Coffee",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    description: "Food description",
    example: "Regular coffee often served black or with milk, cream, and sugar.",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  
  @ApiProperty({
    description: "Food illustration icon Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/drip-coffee.png",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  iconUrl?: string;


  @ApiProperty({
    description: "UserId (Gym manager) who created the food record.",
    example: 1368464,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  createdByUserId: number;


  @ApiProperty({
    description: "Food unique code, meant to be used for app translation and other facilities.",
    example: "drip-coffee",
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  code?: string;


  @ApiProperty({
    description: "Food group id. Example: 14 = Coffee drinks.",
    example: 14,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  foodGroupId: number;
}
 