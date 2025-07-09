import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseBodyPartEnum } from "../../types";


export class UpdateBaseMuscleDto {

  @ApiProperty({
    description: "Muscle's name",
    example: "Occipitofrontalis",
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;


  @ApiProperty({
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
  @IsOptional()
  @IsEnum(BaseBodyPartEnum)
  bodyPart?: BaseBodyPartEnum;


  @ApiProperty({
    description: "Muscle illustration icon Url",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/muscle-occipitofrontalis-illustration.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  iconUrl?: string;


  @ApiProperty({
    description: "Muscle's display order",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  order?: number;
}
