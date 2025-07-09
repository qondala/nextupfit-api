import { IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";


export class UpdateBaseFoodGroupDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Food group name",
    example: "Coffee drinks",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Food group illustration icon Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/coffee-drinks.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  iconUrl?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,  
    description: "UserId (Gym manager) who created the food group record.",
    example: 1368464,
    required: false,
  })
  @IsOptional()
  @IsInt()
  createdByUserId?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Food group's unique code, meant to be used for app translation and other facilities.",
    example: "coffee-drinks",
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;
}
 