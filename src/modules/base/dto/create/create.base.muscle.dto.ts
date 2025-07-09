import {
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


import { SwaggerType } from "@app/common/types";

import { BaseBodyPartEnum } from "../../types";


export class CreateBaseMuscleDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Muscle's name",
    example: "Occipitofrontalis",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Muscle's unique code, meant to be used for app translation and other facilities",
    example: "occipitofrontalis",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;


  @ApiProperty({
    enum: BaseBodyPartEnum,
    enumName: "BaseBodyPartEnum",
    description: "Body part where the muscle is located",
    example: BaseBodyPartEnum.head,
    required: false,
  })
  @IsNotEmpty()
  @IsEnum(BaseBodyPartEnum)
  bodyPart: BaseBodyPartEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Muscle illustration icon Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/muscle-occipitofrontalis-illustration.png",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  iconUrl: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Muscle's display order",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  order?: number;
}
