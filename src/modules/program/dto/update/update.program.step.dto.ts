import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
} from "class-validator";
import { ProgramStepStatusEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class UpdateProgramStepDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step name",
    example: "Daily workout",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step description",
    example: "Here a sample description of the step",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program",
    example: 80,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ownerUserId?: number;
  

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Date the program step was created",
    example: "2025-07-13T18:51:14.000Z",
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdDate?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Step icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsString()
  iconUrl?: string;

  @ApiProperty({
    enum: ProgramStepStatusEnum,
    enumName: "ProgramStepStatusEnum",
    title: "ProgramStepStatusEnum",
    description: "Program step status",
    example: ProgramStepStatusEnum.published,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramStepStatusEnum)
  status?: ProgramStepStatusEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Step attendees count",
    example: 5000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  attendeesCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    example: 1000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  viewsCount?: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    example: 4.5,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number times step was rated",
    example: 3000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  ratingsCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the step",
    example: 2,
    required: false,
    default: 2
  })
  @IsOptional()
  @IsNumber()
  duration?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit",
    example: 16,
    required: false,
    default: 16
  })
  @IsOptional()
  @IsNumber()
  durationUnitId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  difficultyLevel?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Position of the Step inside the Program",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  position?: number;
}

