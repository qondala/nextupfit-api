import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
  IsNumber,
} from "class-validator";
import { ProgramStepActivityStatusEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class UpdateProgramStepActivityWorkingsessionDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step activity Working session name",
    example: "Daily workout",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program step activity Working session description",
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
    description: "Id of the program step acitivity",
    example: 45645,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  programStepActivityId: number;


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
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Step icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsString()
  coverUrl?: string;

  @ApiProperty({
    enum: ProgramStepActivityStatusEnum,
    enumName: "ProgramStepActivityStatusEnum",
    title: "ProgramStepActivityStatusEnum",
    description: "Program step activity status",
    example: ProgramStepActivityStatusEnum.published,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramStepActivityStatusEnum)
  status?: ProgramStepActivityStatusEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number points gained after passing this Workingsession",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  points?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workingsession attendees count",
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsInt()
  attendeesCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Views count",
    example: 1000,
    required: false
  })
  @IsOptional()
  @IsInt()
  viewsCount?: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    example: 4.5,
    required: false
  })
  @IsOptional()
  @IsInt()
  ratingsAvg?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number times Workingsession was rated",
    example: 3000,
    required: false
  })
  @IsOptional()
  @IsInt()
  ratingsCount?: number;


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
    description: "Position of the Workingsession inside the Program Step Activity",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsInt()
  position?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration of the Workingsession",
    example: 60,
    required: false,
  })
  @IsOptional()
  @IsInt()
  duration?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration unit id (e.g., minutes=1)",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  durationUnitId?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Price of the Workingsession",
    example: 9.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price?: number;
}

