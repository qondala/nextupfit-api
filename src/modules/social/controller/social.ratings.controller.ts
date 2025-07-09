import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import { SocialRatingsService } from "../service";
import { DetailsSocialRatingsDto } from "../dto/details";
import { SocialReviewItemTypeEnum } from "../types";

@ApiTags("Social module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("social/ratings")
export class SocialRatingsController {
  constructor(private readonly ratingsService: SocialRatingsService) {}


  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get gym ratings',
    operationId: 'getGymRatings'
  })
  @ApiParam({
    name: 'gymId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Gym ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return gym ratings.',
    type: DetailsSocialRatingsDto,
  })  
  getGymRatings(@Param('gymId', ParseIntPipe) gymId: number): Promise<DetailsSocialRatingsDto> {
    return this.ratingsService.findOne(SocialReviewItemTypeEnum.gym, gymId);
  }

  @Get('program/:programId')
  @ApiOperation({
    summary: 'Get program ratings',
    operationId: 'getProgramRatings'
  })
  @ApiParam({
    name: 'programId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Program ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return program ratings.',
    type: DetailsSocialRatingsDto,
  })  
  getProgramRatings(@Param('programId', ParseIntPipe) programId: number): Promise<DetailsSocialRatingsDto> {
    return this.ratingsService.findOne(SocialReviewItemTypeEnum.program, programId);
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get manager ratings',
    operationId: 'getManagerRatings'
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Manager ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return manager ratings.',
    type: DetailsSocialRatingsDto,
  })  
  getManagerRatings(@Param('managerId', ParseIntPipe) managerId: number): Promise<DetailsSocialRatingsDto> {
    return this.ratingsService.findOne(SocialReviewItemTypeEnum.manager, managerId);
  }

  @Get('activity/:activityId')
  @ApiOperation({
    summary: 'Get activity ratings',
    operationId: 'getActivityRatings'
  })
  @ApiParam({
    name: 'activityId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Activity ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return activity ratings.',
    type: DetailsSocialRatingsDto,
  })  
  getActivityRatings(@Param('activityId', ParseIntPipe) activityId: number): Promise<DetailsSocialRatingsDto> {
    return this.ratingsService.findOne(SocialReviewItemTypeEnum.activity, activityId);
  }

  @Get('working-session/:workingSessionId')
  @ApiOperation({
    summary: 'Get working session ratings',
    operationId: 'getWorkingSessionRatings'
  })
  @ApiParam({
    name: 'workingSessionId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Working session ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return working session ratings.',
    type: DetailsSocialRatingsDto,
  })  
  getWorkingSessionRatings(@Param('workingSessionId', ParseIntPipe) workingSessionId: number): Promise<DetailsSocialRatingsDto> {
    return this.ratingsService.findOne(SocialReviewItemTypeEnum.workingsession, workingSessionId);
  }


  @Get('workout/:workoutId')
  @ApiOperation({
    summary: 'Get workout ratings',
    operationId: 'getWorkoutRatings'
  })
  @ApiParam({
    name: 'workoutId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Workout ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return workout ratings.',
    type: DetailsSocialRatingsDto,
  })  
  async getWorkoutRatings(@Param('workoutId', ParseIntPipe) workoutId: number): Promise<DetailsSocialRatingsDto> {
    return await this.ratingsService.findOne(SocialReviewItemTypeEnum.workout, workoutId);
  }


  @Get('content/:contentId')
  @ApiOperation({
    summary: 'Get content ratings',
    operationId: 'getContentRatings'
  })
  @ApiParam({
    name: 'contentId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Content ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return content ratings.',
    type: DetailsSocialRatingsDto,
  })  
  getContentRatings(@Param('contentId', ParseIntPipe) contentId: number): Promise<DetailsSocialRatingsDto> {
    return this.ratingsService.findOne(SocialReviewItemTypeEnum.content, contentId);
  }
  
  
}
