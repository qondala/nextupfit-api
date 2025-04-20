import {
    IsNumber,
    IsOptional,
    IsBoolean,
    IsDate, 
    IsNotEmpty} from "class-validator";
  import { ApiProperty } from "@nestjs/swagger";
  
export class CreateGymManagerFollowerDto {

  @ApiProperty({
    description: "Manager (coach, nutritionist, instructor) user id",
    example: 1235,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  managerUserId: number;


  @ApiProperty({
    description: "Follower user id",
    example: 1237,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  followerUserId: number;


  @ApiProperty({
    description: "Date follower started to follow",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  acceptedDate?: Date;


  @ApiProperty({
    description: "Date follower stopped following",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  stoppedDate?: Date;


  @ApiProperty({
    description: "Date manager/follower blocked each other",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  blockedDate?: Date;


  @ApiProperty({
    description: "Whether the manager accepted the follow request",
    example: true,
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  accepted?: boolean;


  @ApiProperty({
    description: "Whether the manager/follower has blocked each other",
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;


  @ApiProperty({
    description: "Whether the follower has stopped following the manager",
    example: false,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  stopped?: boolean;
}
  