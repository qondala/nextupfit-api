import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
  IsBoolean,
  IsNumber,
} from "class-validator";
import { ProgramStepActivityStatusEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class UpdateProgramStepActivityDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step activity name",
    example: "Daily workout",
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step activity description",
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
  @IsInt()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
      description: "Id of the program",
    example: 80,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    example: 789,
    required: false,
  })
  @IsOptional()
  @IsInt()
  programStepId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerUserId?: number;
  

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date the program step activity was created",
    example: Date(),
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
    enumName: "ProgramStepActivityStatusEnum",
    title: "ProgramStepActivityStatusEnum",
    enum: ProgramStepActivityStatusEnum,
    description: "Program step activity status",
    example: ProgramStepActivityStatusEnum.published,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramStepActivityStatusEnum)
  status?: ProgramStepActivityStatusEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number points gained after passing this activity",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  points?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Activity attendees count",
    example: 5000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  attendeesCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    example: 1000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
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
    description: "Number times activity was rated",
    example: 3000,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  ratingsCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the step",
    example: 2,
    required: false,
    default: 2
  })
  @IsOptional()
  @IsInt()
  duration?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit",
    example: 16,
    required: false,
    default: 16
  })
  @IsOptional()
  @IsInt()
  durationUnitId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsInt()
  difficultyLevel?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Position of the Activity inside the Program Step",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsInt()
  position: number;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is the activity a free tool?",
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isFreeTool?: boolean;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Price of the activity",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  price?: number;
  
  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is the activity a challenge?",
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isChallenge?: boolean;
}

