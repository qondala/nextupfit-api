import {
  IsOptional,
  IsBoolean,
  IsDate, 
  IsNotEmpty,
  IsInt
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
  
export class CreateGymManagerFollowerDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager (coach, nutritionist, instructor) user id",
    example: 1235,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  managerUserId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Follower user id",
    example: 1237,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  followerUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date follower started to follow",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  acceptedDate?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date follower stopped following",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  stoppedDate?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date manager/follower blocked each other",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  blockedDate?: Date;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether the manager accepted the follow request",
    example: true,
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  accepted?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether the manager/follower has blocked each other",
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether the follower has stopped following the manager",
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  stopped?: boolean;
}
  