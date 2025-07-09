import {
  IsInt,
  IsOptional,
  IsBoolean, 
  IsDate,
  IsNotEmpty
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";


export class CreateGymFollowerDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    example: 235,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gymId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Follower user id",
    example: 1235,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  followerUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date the follower joined",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  acceptedDate?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date the follower stopped following",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  stoppedDate?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date the gym blocked follower",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  blockedDate?: Date;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether the follow request was accepted (By the gym)",
    example: true,
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  accepted?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether the follower has been blocked",
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether the follower stopped following the gym",
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  stopped?: boolean;
}
