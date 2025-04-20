import {
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDate,
  IsEnum,
  IsString,
  IsNotEmpty
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { GymManagerRoleEnum } from "../../types";


export class CreateGymManagerDto {

  @ApiProperty({
    description: "Gym id",
    example: 345,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  gymId: number;


  @ApiProperty({
    description: "Gym manager id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;


  @ApiProperty({
    description: "Gym manager role",
    example: GymManagerRoleEnum.owner,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GymManagerRoleEnum)
  role: GymManagerRoleEnum;


  @ApiProperty({
    description: "Gym manager enrollment date",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  dateEnrollment?: Date;


  @ApiProperty({
    description: "Whether the manager was suspended",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  suspended?: boolean;
}
