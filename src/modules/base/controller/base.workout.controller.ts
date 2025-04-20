import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  NotFoundException,
  HttpStatus,
  Query,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth, ApiNotFoundResponse, ApiNoContentResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';

import { BaseWorkoutService } from '../service';
import {
  CreateBaseWorkoutDto,
  DetailsBaseWorkoutDto,
  PaginatedDetailsBaseWorkoutDto,
  UpdateBaseWorkoutDto
} from '../dto';

@ApiTags("Base module endpoints")
// @ApiBearerAuth()
@Controller("base/workout")
// @UseGuards(JwtAuthGuard, RolesGuard)
export class BaseWorkoutController {

  constructor(private readonly baseWorkoutService: BaseWorkoutService) {}

  @Post()
  @ApiOperation({
    operationId: 'createBaseWorkout',
    summary: 'Create a new workout'
  })
  @ApiCreatedResponse({ 
    description: 'The workout has been successfully created.',
    type: DetailsBaseWorkoutDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Bad request. Code already exists or invalid input.',
    type: BadRequestException
  })
  async create(@Body() createBaseWorkoutDto: CreateBaseWorkoutDto): Promise<DetailsBaseWorkoutDto> {
    try {
      return await this.baseWorkoutService.create(createBaseWorkoutDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Workout with this code already exists');
      }
      throw error;
    }
  }


  @Get()
  @ApiOperation({
    operationId: 'getBaseWorkouts',
    summary: 'Get all workouts with pagination'
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'userId',
    description: 'Filter by creator user ID',
    required: false,
    type: Number
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of workouts',
    type: PaginatedDetailsBaseWorkoutDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedDetailsBaseWorkoutDto> {
    return this.baseWorkoutService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({
    operationId: 'searchBaseWorkouts',
    summary: 'Search workouts by query string with pagination'
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query string',
    required: true
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: Number
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: Number
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated search results of workouts',
    type: PaginatedDetailsBaseWorkoutDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseWorkoutDto> {
    return this.baseWorkoutService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({
    operationId: 'getBaseWorkoutByCode',
    summary: 'Get workout by code'
  })
  @ApiParam({ name: 'code', description: 'Workout code' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found workout',
    type: DetailsBaseWorkoutDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout not found',
    type: NotFoundException
  })
  async findByCode(@Param('code') code: string): Promise<DetailsBaseWorkoutDto> {
    const workout = await this.baseWorkoutService.findByCode(code);
    if (!workout) {
      throw new NotFoundException(`Workout with code '${code}' not found`);
    }
    return workout;
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getBaseWorkoutById',
    summary: 'Get a specific workout by ID'
  })
  @ApiParam({ name: 'id', description: 'Workout ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found workout',
    type: DetailsBaseWorkoutDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout not found',
    type: NotFoundException
  })
  async findOne(@Param('id') id: string): Promise<DetailsBaseWorkoutDto> {
    const workout = await this.baseWorkoutService.findOne(+id);
    if (!workout) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }
    return workout;
  }


  @Put(':id')
  @ApiOperation({
    operationId: 'updateBaseWorkout',
    summary: 'Update a workout by ID'
  })
  @ApiParam({ name: 'id', description: 'Workout ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated workout',
    type: DetailsBaseWorkoutDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout not found',
    type: NotFoundException
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.',
    type: BadRequestException
  })
  async update(
    @Param('id') id: string,
    @Body() updateBaseWorkoutDto: UpdateBaseWorkoutDto,
  ): Promise<DetailsBaseWorkoutDto> {
    try {
      const workout = await this.baseWorkoutService.update(+id, updateBaseWorkoutDto);
      if (!workout) {
        throw new NotFoundException(`Workout with ID ${id} not found`);
      }
      return workout;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Workout with this code already exists');
      }
      throw error;
    }
  }


  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteBaseWorkout',
    summary: 'Delete a workout by ID'
  })
  @ApiNoContentResponse({
    description: 'The workout has been successfully deleted'
  })
  @ApiNotFoundResponse({
    description: 'Workout not found'
  })
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseWorkoutService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Workout with ID ${id} not found`);
    }
  }

} 