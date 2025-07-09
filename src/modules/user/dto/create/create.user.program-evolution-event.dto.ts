import {
  IsOptional,
  IsEnum,
  IsNumber,
  IsDefined,
  IsInt
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
  ProgramEvolutionEventTypeEnum,
  ProgramItemTypeEnum
} from "@app/module/program/types";
import { SwaggerType } from "@app/common/types";

export class CreateUserProgramEvolutionEventDto {

  @ApiProperty({
    enum: ProgramEvolutionEventTypeEnum,
    enumName: "ProgamEvolutionEventTypeEnum",
    description: "For saving any program evolution of the user",
    example: ProgramEvolutionEventTypeEnum.registered,
    required: true,
  })
  @IsDefined()
  @IsEnum(ProgramEvolutionEventTypeEnum)
  event: ProgramEvolutionEventTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345,
    required: true,
  })
  @IsDefined()
  @IsNumber()
  userId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym owning the program",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Concerned program",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programItemId?: number;


  @ApiProperty({
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
    description: "Program component concerned by the evolution",
    example: ProgramItemTypeEnum.workout,
    required: true,
  })
  @IsDefined()
  @IsEnum(ProgramItemTypeEnum)
  programItem: ProgramItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Progression points",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  progressionPoints?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Progression percentage (0-100)",
    example: 25.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  progressionPercentage?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Total progression percentage",
    example: 70.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  totalProgressionPercentage?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Total progression points",
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  totalProgressionPoints?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Quantity",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  quantity?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Iteration: for programs that extends over multiple days or another time unit, this field represents the nth day the user attents to the program component.",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  iteration?: number;
}
