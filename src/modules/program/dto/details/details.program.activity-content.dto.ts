import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsObject,
  IsOptional,
} from "class-validator";

import {
  ActivityContent,
  ActivityContentBuilder,
  ProgramActivityContentTypeEnum
} from "../../types";


export class DetailsProgramActivityContentDto {

  @ApiProperty({
    type: Number,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    description: "Program activity content title",
    example: "Daily workout",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;


  @ApiProperty({
    description: "Program activity content description",
    example: "I'm a sample content description of the activity",
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({
    description: "Id of the gym owning the content",
    example: 5656,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymOwnerId: number;


  @ApiProperty({
    description: "Id of the gym manager owning the content",
    example: 43354534,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymManagerOwnerId: number;


  @ApiProperty({
    description: "Visual component type for populating activities",
    example: ProgramActivityContentTypeEnum.accordion,
    required: true,
  })
  @IsEnum(ProgramActivityContentTypeEnum)
  type: ProgramActivityContentTypeEnum;


  @ApiProperty({
    description: "Visual component data container for populating activities",
    example: (new ActivityContentBuilder()).get(),
    required: true,
  })
  @IsObject()
  content: ActivityContent;


  @ApiProperty({
    description: "Position of the content inside the holder (step, activity, working session, workout)",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  position: number;

}
