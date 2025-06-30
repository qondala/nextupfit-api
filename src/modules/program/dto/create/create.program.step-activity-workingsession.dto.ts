import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
} from "class-validator";
import { ProgramStepActivityStatusEnum } from "../../types";


export class CreateProgramStepActivityWorkingsessionDto {
  @ApiProperty({
    description: "Program step activity Working session name",
    example: "Daily workout",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Program step activity Working session description",
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
    description: "Id of the program step acitivity",
    example: 45645,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  programStepActivityId: number;


  @ApiProperty({
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  ownerUserId: number;
  
	;
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
  imagerUrl?: string;

  @ApiProperty({
    description: "Step icon URL",
    example: "https://res.cloudinary.com/ds9ufzny1/image/upload/v1697110655/icons/my-program-icon.png",
    required: false,
  })
  @IsString()
  coverUrl?: string;

  @ApiProperty({
    description: "Program step activity status",
    example: ProgramStepActivityStatusEnum.published,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramStepActivityStatusEnum)
  status: ProgramStepActivityStatusEnum;


  @ApiProperty({
    description: "Number points gained after passing this Workingsession",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  points: number;


  @ApiProperty({
    description: "Workingsession attendees count",
    example: 5000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  attendeesCount?: number;


  @ApiProperty({
    description: "Views count",
    example: 1000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  viewsCount: number;


  @ApiProperty({
    description: "Ratings average",
    example: 4.5,
    required: false
  })
  @IsOptional()
  @IsNumber()
  ratingsAvg: number;


  @ApiProperty({
    description: "Number times Workingsession was rated",
    example: 3000,
    required: false
  })
  @IsOptional()
  @IsNumber()
  ratingsCount: number;


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
    description: "Position of the Workingsession inside the Program Step Activity",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  position: number;
}
