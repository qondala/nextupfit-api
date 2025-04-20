import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseHighlightColorEnum } from "../../types";


export class CreateBaseWorkoutHowtoPerformStepDto {

  @ApiProperty({
    description: "Short sentence that describes a workout step",
    example: "Bend backward without touching the ground with your back",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({
    description: "Url of the illustrative image of the step's description",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/base/workout-oo13-step01-illustration.png",
    required: false
  })
  @IsOptional()
  @IsString()
  illustrationUrl?: string;


  @ApiProperty({
    description: "Step's highlight color",
    example: BaseHighlightColorEnum.red,
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseHighlightColorEnum)
  highlight?: BaseHighlightColorEnum;


  @ApiProperty({
    description: "Base workout",
    example: 13,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  baseWorkoutId: number;


  @ApiProperty({
    description: "Step's display order in the workout",
    example: 1,
    required: true,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  order?: number;
}
