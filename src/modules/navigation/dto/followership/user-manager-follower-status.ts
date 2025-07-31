import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';
import { SwaggerType } from '@app/common/types';


export class UserManagerFollowerStatus {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  managerUserId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the follower',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  followerUserId: number;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Accepted status of the gym manager follower',
    example: true,
    required: false,
  })
  accepted?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Blocked status of the gym manager follower',
    example: true,
    required: false,
  })
  blocked?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Stopped status of the gym manager follower',
    example: true,
    required: false,
  })
  stopped?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Rejected status of the gym manager follower',
    example: true,
    required: false,
  })
  rejected?: boolean;
}
