import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';

import { User } from '@app/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginationOptionsDto } from '@app/common/dto';


import { SwaggerType } from '@app/common/types';

import {
  CreateSocialReviewDto,
  PaginatedDetailsSocialReviewDto,
  UpdateSocialReviewDto
} from '../dto';
import { SocialRatingsService, SocialReviewService } from '../service';
import { DetailsSocialRatingsDto, DetailsSocialReviewDto } from '../dto/details';
import { SocialReviewItemTypeEnum } from '../types';

@ApiTags('Social module endpoints')
@ApiBearerAuth()
@Controller('social/review')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialReviewController {
  constructor(
    private readonly reviewService: SocialReviewService,
    private readonly ratingsService: SocialRatingsService
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a review',
    operationId: 'createReview'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Review created successfully.',
    type: DetailsSocialReviewDto,
  })
  create(
    @Body() createDto: CreateSocialReviewDto,
    @User('id') userId: number
  ) {
    const review = this.reviewService.create(createDto, userId);

    // After creating review, update ratings
    // TODO: run this in a separate process
    this.ratingsService.updateRatings(createDto.itemType, createDto.itemId);
    return review;
  }

  @Get('gym/:gymId')
  @ApiOperation({
    summary: 'Get gym reviews',
    operationId: 'getGymReviews'
  })
  @ApiParam({
    name: 'gymId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Gym ID',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all reviews.',
    type: PaginatedDetailsSocialReviewDto,
  })
  async getGymReviews(
    @Param('gymId', ParseIntPipe) gymId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsSocialReviewDto> {
    return this.reviewService.getReviewsByItemTypeAndItemId(
      SocialReviewItemTypeEnum.gym,
      gymId,
      paginationOptions
    );
  }

  @Get('program/:programId')
  @ApiOperation({
    summary: 'Get program reviews',
    operationId: 'getProgramReviews'
  })
  @ApiParam({
    name: 'programId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Program ID',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all reviews.',
    type: PaginatedDetailsSocialReviewDto,
  })
  async getProgramReviews(
    @Param('programId', ParseIntPipe) programId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsSocialReviewDto> {
    return this.reviewService.getReviewsByItemTypeAndItemId(
      SocialReviewItemTypeEnum.program,
      programId,
      paginationOptions
    );
  }

  @Get('activity/:activityId')
  @ApiOperation({
    summary: 'Get activity reviews',
    operationId: 'getActivityReviews'
  })
  @ApiParam({
    name: 'activityId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Activity ID',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all reviews.',
    type: PaginatedDetailsSocialReviewDto,
  })
  getActivityReviews(
    @Param('activityId', ParseIntPipe) activityId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsSocialReviewDto> {
    return this.reviewService.getReviewsByItemTypeAndItemId(
      SocialReviewItemTypeEnum.activity,
      activityId,
      paginationOptions
    );
  }


  @Get('working-session/:workingSessionId')
  @ApiOperation({
    summary: 'Get working session reviews',
    operationId: 'getWorkingSessionReviews'
  })
  @ApiParam({
    name: 'workingSessionId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Working session ID',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all reviews.',
    type: PaginatedDetailsSocialReviewDto,
  })
  getWorkingSessionReviews(
    @Param('workingSessionId', ParseIntPipe) workingSessionId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsSocialReviewDto> {
    return this.reviewService.getReviewsByItemTypeAndItemId(
      SocialReviewItemTypeEnum.workingsession,
      workingSessionId,
      paginationOptions
    );
  }

  @Get('workout/:workoutId')
  @ApiOperation({
    summary: 'Get workout reviews',
    operationId: 'getWorkoutReviews'
  })
  @ApiParam({
    name: 'workoutId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Workout ID',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all reviews.',
    type: PaginatedDetailsSocialReviewDto,
  })
  getWorkoutReviews(
    @Param('workoutId', ParseIntPipe) workoutId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsSocialReviewDto> {
    return this.reviewService.getReviewsByItemTypeAndItemId(
      SocialReviewItemTypeEnum.workout,
      workoutId,
      paginationOptions
    );
  }

  @Get('manager/:managerId')
  @ApiOperation({
    summary: 'Get manager reviews',
    operationId: 'getManagerReviews'
  })
  @ApiParam({
    name: 'managerId',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Manager ID',
    example: 1,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: SwaggerType.INTEGER,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all reviews.',
    type: PaginatedDetailsSocialReviewDto,
  })
  getManagerReviews(
    @Param('managerId', ParseIntPipe) managerId: number,
    @Query() paginationOptions: PaginationOptionsDto
  ): Promise<PaginatedDetailsSocialReviewDto> {
    return this.reviewService.getReviewsByItemTypeAndItemId(
      SocialReviewItemTypeEnum.manager,
      managerId,
      paginationOptions
    );
  }

  
  @Patch(':id')
  @ApiOperation({
    summary: 'Update review',
    operationId: 'updateReview'
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: SwaggerType.INTEGER,
    description: 'Review ID',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Review updated successfully.',
    type: DetailsSocialReviewDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSocialReviewDto
  ) {
    return this.reviewService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete review',
    operationId: 'deleteReview'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Review deleted successfully.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.remove(id);
  }
}
