import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { ProgramStepActivityStatusEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class CreateProgramStepActivityDto {
  @ApiProperty({
    description: "Program step activity name",
    example: "Daily workout",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Program step activity description",
    example: "Here a sample description of the step",
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: "Id of the gym promoting the program",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    description: "Id of the program",
    example: 80,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  programId: number;

  @ApiProperty({
    description: "Id of the program step",
    example: 789,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  programStepId: number;


  @ApiProperty({
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  ownerUserId: number;
  

  @ApiProperty({
    description: "Date the program step activity was created",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdDate?: Date;

  @ApiProperty({
    description: "Step icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsString()
  iconUrl?: string;


  @ApiProperty({
    description: "Program step activity status",
    example: ProgramStepActivityStatusEnum.published,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramStepActivityStatusEnum)
  status: ProgramStepActivityStatusEnum;


  @ApiProperty({
    description: "Number points gained after passing this activity",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  points: number;


  @ApiProperty({
    description: "Activity attendees count",
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
    description: "Number times activity was rated",
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
    description: "Position of the Activity inside the Program Step",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  position: number;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Is the activity a free tool?",
    example: false,
    required: false,
    default: false
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
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isChallenge?: boolean;
}
