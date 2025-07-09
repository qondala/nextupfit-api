import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
  IsInt,
} from "class-validator";
import { ProgramStepStatusEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class CreateProgramStepDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step name",
    example: "Daily workout",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step description",
    example: "Here a sample description of the step",
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the program",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gymId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program",
    example: 80,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  programId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ownerUserId: number;


  @ApiProperty({
    description: "Step icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsString()
  iconUrl?: string;

  @ApiProperty({
    description: "Program step status",
    example: ProgramStepStatusEnum.published,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramStepStatusEnum)
  status: ProgramStepStatusEnum;


  @ApiProperty({
    description: "Step attendees count",
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
    description: "Number times step was rated",
    example: 3000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  ratingsCount?: number;


  @ApiProperty({
    description: "Duration of the step",
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

  @ApiProperty({
    description: "Position of the Step inside the Program",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  position: number;
}
