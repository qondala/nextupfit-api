import { SwaggerType } from "@app/common/types";
import { DetailsUserDto } from "@app/module/user/dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsInt } from "class-validator";
import { DetailsGymManagerDto } from "./details.gym.manager.dto";

export class DetailsGymManagerFollowerDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager follower",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the gym manager",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  managerUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the follower",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  followerUserId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Accepted date of the gym manager follower",
    example: "2022-01-01T00:00:00.000Z",
    required: false,
  })
  acceptedDate?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Stopped date of the gym manager follower",
    example: "2022-01-01T00:00:00.000Z",
    required: false,
  })
  stoppedDate?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Blocked date of the gym manager follower",
    example: "2022-01-01T00:00:00.000Z",
    required: false,
  })
  blockedDate?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Rejected date of the gym manager follower",
    example: "2022-01-01T00:00:00.000Z",
    required: false,
  })
  rejectedDate?: Date;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Accepted status of the gym manager follower",
    example: true,
    required: false,
  })
  accepted?: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Blocked status of the gym manager follower",
    example: true,
    required: false,
  })
  blocked?: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Stopped status of the gym manager follower",
    example: true,
    required: false,
  })
  stopped?: boolean;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Rejected status of the gym manager follower",
    example: true,
    required: false,
  })
  rejected?: boolean;

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    title: "DetailsGymManagerDto",
    description: "Manager of the gym manager follower",
    required: true,
  })
  @Type(() => DetailsGymManagerDto)
  manager: DetailsGymManagerDto;

  @ApiProperty({
    type: () => DetailsUserDto,
    title: "DetailsUserDto",
    description: "Follower of the gym manager follower",
    required: true,
  })
  @Type(() => DetailsUserDto)
  follower: DetailsUserDto;
}
