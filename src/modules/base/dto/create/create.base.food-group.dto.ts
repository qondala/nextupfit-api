import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateBaseFoodGroupDto {

  @ApiProperty({
    description: "Food group name",
    example: "Coffee drinks",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    description: "Food group illustration icon Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/coffee-drinks.png",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  iconUrl?: string;


  @ApiProperty({
    description: "UserId (Gym manager) who created the food group record.",
    example: 1368464,
    required: true,
  })
  @IsNotEmpty()
  @IsNotEmpty()
  createdByUserId: number;


  @ApiProperty({
    description: "Food group's unique code, meant to be used for app translation and other facilities.",
    example: "coffee-drinks",
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  code?: string;
}
 