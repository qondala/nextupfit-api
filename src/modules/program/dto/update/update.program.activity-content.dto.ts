import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsString,
  IsEnum,
  IsObject,
  IsOptional,
} from "class-validator";

import {
  ActivityContent,
  ActivityContentBuilder,
  ProgramActivityContentTypeEnum,
  ProgramItemTypeEnum
} from "../../types";


export class UpdateProgramActivityContentDto {

  @ApiProperty({
    description: "Program activity content title",
    example: "Daily workout",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;


  @ApiProperty({
    description: "Program activity content description",
    example: "I'm a sample content description of the activity",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    description: "Id of the gym owning the content",
    example: 5656,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymOwnerId?: number;


  @ApiProperty({
    description: "Id of the gym manager owning the content",
    example: 43354534,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymManagerOwnerId?: number;


  @ApiProperty({
    description: "Visual component type for populating activities",
    example: ProgramActivityContentTypeEnum.accordion,
    required: false,
  })
  @IsEnum(ProgramActivityContentTypeEnum)
  type?: ProgramActivityContentTypeEnum;


  @ApiProperty({
    description: "Visual component data container for populating activities",
    example: (new ActivityContentBuilder()).get(),
    required: false,
  })
  @IsObject()
  content?: ActivityContent;


  @ApiProperty({
    description: "Program container id (program id or step id or activity id or workout id)",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  containerId?: number;


  @ApiProperty({
    description: "Program container type",
    example: ProgramItemTypeEnum.activity,
    required: false,
  })
  @IsEnum(ProgramItemTypeEnum)
  containerType?: ProgramItemTypeEnum;


  @ApiProperty({
    description: "Position of the content inside the holder (step, activity, working session, workout)",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  position?: number;

}

