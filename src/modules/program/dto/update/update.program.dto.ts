import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from "class-validator";
import { ProgramStatusEnum, ProgramTypeEnum } from "../../types";


export class UpdateProgramDto {
  @ApiProperty({
    description: "Program name",
    example: "Daily workout",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Id of the gym promoting the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ownerUserId?: number;
  

  @ApiProperty({
    description: "Program type",
    example: ProgramTypeEnum.nutrition,
    required: false,
  })
  @IsEnum(ProgramTypeEnum)
  type?: ProgramTypeEnum;


  @ApiProperty({
    description: "Program status",
    example: ProgramStatusEnum.published,
    required: false,
  })
  @IsEnum(ProgramStatusEnum)
  status?: ProgramStatusEnum;


  @ApiProperty({
    description: "Program icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  iconUrl?: string;


  @ApiProperty({
    description: "Program icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/program/covers/my-program-cover.png",
    required: false,
  })
  @IsOptional()
  @IsString()
  coverUrl?: string;


  @ApiProperty({
    description: "Program attendees count",
    example: 5000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  attendeesCount?: number;


  @ApiProperty({
    description: "Views count",
    example: 1000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  viewsCount?: number;


  @ApiProperty({
    description: "Ratings average",
    example: 4.5,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg?: number;


  @ApiProperty({
    description: "Number times program was rated",
    example: 3000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  ratingsCount?: number;


  @ApiProperty({
    description: "Duration of the program",
    example: 2,
    required: false,
    default: 2
  })
  @IsOptional()
  @IsNumber()
  duration?: number;


  @ApiProperty({
    description: "Duration unit",
    example: 16,
    required: false,
    default: 16
  })
  @IsOptional()
  @IsNumber()
  durationUnitId?: number;


  @ApiProperty({
    description: "Difficulty level on a scale of 10",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  difficultyLevel?: number;
}

