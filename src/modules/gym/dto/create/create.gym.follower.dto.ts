import {
  IsNumber,
  IsOptional,
  IsBoolean, 
  IsDate,
  IsNotEmpty
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateGymFollowerDto {

  @ApiProperty({
    description: "Gym id",
    example: 235,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    description: "Follower user id",
    example: 1235,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  followerUserId: number;


  @ApiProperty({
    description: "Date the follower joined",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  acceptedDate?: Date;


  @ApiProperty({
    description: "Date the follower stopped following",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  stoppedDate?: Date;


  @ApiProperty({
    description: "Date the gym blocked follower",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  blockedDate?: Date;


  @ApiProperty({
    description: "Whether the follow request was accepted (By the gym)",
    example: true,
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  accepted?: boolean;


  @ApiProperty({
    description: "Whether the follower has been blocked",
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;


  @ApiProperty({
    description: "Whether the follower stopped following the gym",
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  stopped?: boolean;
}
