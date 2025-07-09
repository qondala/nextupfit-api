import { IsInt, IsOptional, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";


export class UpdateBaseFoodDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Food name",
    example: "Drip Coffee",
    required: true,
  })
  @IsOptional()
  @IsString()
  name?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Food description",
    example: "Regular coffee often served black or with milk, cream, and sugar.",
    required: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Food illustration icon Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/drip-coffee.png",
    required: true,
  })
  @IsOptional()
  @IsString()
  iconUrl?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "UserId (Gym manager) who created the food record.",
    example: 1368464,
    required: true,
  })
  @IsInt()
  @IsNumber()
  createdByUserId?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Food unique code, meant to be used for app translation and other facilities.",
    example: "drip-coffee",
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Food group id. Example: 14 = Coffee drinks.",
    example: 14,
    required: true,
  })
  @IsOptional()
  @IsNumber()
  foodGroupId?: number;
}
 