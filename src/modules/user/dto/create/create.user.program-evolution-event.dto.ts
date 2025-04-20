import { IsOptional, IsDate, IsEnum, IsNumber, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ProgamEvolutionEventTypeEnum, ProgramItemTypeEnum } from "@app/module/program/types";

export class CreateUserProgramEvolutionEventDto {

  @ApiProperty({
    enum: ProgamEvolutionEventTypeEnum,
    enumName: "ProgamEvolutionEventTypeEnum",
    isArray: true,
    description: "For saving any program evolution of the user",
    example: ProgamEvolutionEventTypeEnum.registered,
    required: true,
  })
  @IsDefined()
  @IsEnum(ProgamEvolutionEventTypeEnum)
  event: ProgamEvolutionEventTypeEnum;


  @ApiProperty({
    type: Number,
    description: "User id",
    example: 12345,
    required: true,
  })
  @IsDefined()
  @IsNumber()
  userId: number;


  @ApiProperty({
    type: Number,
    description: "Gym owning the program",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    type: Number,
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
    isArray: true,
    description: "Program component concerned by the evolution",
    example: ProgramItemTypeEnum.workout,
    required: true,
  })
  @IsDefined()
  @IsEnum(ProgramItemTypeEnum)
  programItem: ProgramItemTypeEnum;


  @ApiProperty({
    type: Date,
    description: "Date of subscription",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  subscriptionDate?: Date;


  @ApiProperty({
    type: Number,
    description: "Quantity",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;


  @ApiProperty({
    type: Number,
    description: "Iteration: for programs that extends over multiple days or another time unit, this field represents the nth day the user attents to the program component.",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  iteration?: number;
}
