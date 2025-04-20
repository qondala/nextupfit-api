import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseBodyPartEnum } from "../../types";


export class CreateBaseMuscleDto {

  @ApiProperty({
    description: "Muscle's name",
    example: "Occipitofrontalis",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    description: "Muscle's unique code, meant to be used for app translation and other facilities",
    example: "occipitofrontalis",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;


  @ApiProperty({
    description: "Body part where the muscle is located",
    example: BaseBodyPartEnum.head,
    required: false,
  })
  @IsNotEmpty()
  @IsEnum(BaseBodyPartEnum)
  bodyPart: BaseBodyPartEnum;


  @ApiProperty({
    description: "Muscle illustration icon Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/muscle-occipitofrontalis-illustration.png",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  iconUrl: string;


  @ApiProperty({
    description: "Muscle's display order",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  order?: number;
}
