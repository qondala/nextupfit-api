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
  HttpCode,
  Query,
  BadRequestException,
  UseGuards,
  ParseIntPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth
} from '@nestjs/swagger';

import { SwaggerType } from '@app/common/types';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';

import {
  PaginatedDetailsBaseWorkoutHowtoPerformStepDto,
  DetailsBaseWorkoutHowtoPerformStepDto,
  CreateBaseWorkoutHowtoPerformStepDto,
  UpdateBaseWorkoutHowtoPerformStepDto
} from '../dto';

import { BaseWorkoutHowtoPerformStepService } from '../service';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/workout/howto-perform-step")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseWorkoutHowtoPerformStepController {
  constructor(private readonly baseWorkoutHowtoPerformStepService: BaseWorkoutHowtoPerformStepService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new workout howto perform step',
    description: 'Create a new workout howto perform step',
    operationId: 'createWorkoutHowtoPerformStep'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED,
    description: 'The workout howto perform step has been successfully created.',
    type: DetailsBaseWorkoutHowtoPerformStepDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.'
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createBaseWorkoutHowtoPerformStepDto: CreateBaseWorkoutHowtoPerformStepDto
  ): Promise<DetailsBaseWorkoutHowtoPerformStepDto> {
    try {
      return await this.baseWorkoutHowtoPerformStepService.create(createBaseWorkoutHowtoPerformStepDto) as unknown as DetailsBaseWorkoutHowtoPerformStepDto;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Workout howto perform step with this code already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all workout howto perform steps with pagination',
    description: 'Get all workout howto perform steps with pagination',
    operationId: 'getAllWorkoutHowtoPerformSteps'
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'workoutId',
    description: 'Filter by workout ID',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of workout howto perform steps',
    type: PaginatedDetailsBaseWorkoutHowtoPerformStepDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('workoutId') workoutId?: number
  ): Promise<PaginatedDetailsBaseWorkoutHowtoPerformStepDto> {
    return this.baseWorkoutHowtoPerformStepService.findAll({
      page: +page,
      limit: +limit
    }, workoutId ? +workoutId : undefined);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search workout howto perform steps by query string with pagination',
    description: 'Search workout howto perform steps by query string with pagination',
    operationId: 'searchWorkoutHowtoPerformSteps'
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query string',
    required: true,
    type: SwaggerType.STRING
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated search results of workout howto perform steps',
    type: PaginatedDetailsBaseWorkoutHowtoPerformStepDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseWorkoutHowtoPerformStepDto> {
    return this.baseWorkoutHowtoPerformStepService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({
    summary: 'Get workout howto perform step by code',
    description: 'Get workout howto perform step by code',
    operationId: 'getWorkoutHowtoPerformStepByCode'
  })
  @ApiParam({
    name: 'code',
    description: 'Workout howto perform step code',
    required: true,
    type: SwaggerType.STRING
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found workout howto perform step',
    type: DetailsBaseWorkoutHowtoPerformStepDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout howto perform step not found'
  })
  async findByCode(@Param('code') code: string): Promise<DetailsBaseWorkoutHowtoPerformStepDto> {
    const step = await this.baseWorkoutHowtoPerformStepService.findByCode(code);
    if (!step) {
      throw new NotFoundException(`Workout howto perform step with code '${code}' not found`);
    }
    return step;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific workout howto perform step by ID',
    description: 'Get a specific workout howto perform step by ID',
    operationId: 'getWorkoutHowtoPerformStepById'
  })
  @ApiParam({
    name: 'id',
    description: 'Workout howto perform step ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found workout howto perform step',
    type: DetailsBaseWorkoutHowtoPerformStepDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout howto perform step not found'
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsBaseWorkoutHowtoPerformStepDto> {
    const step = await this.baseWorkoutHowtoPerformStepService.findOne(+id);
    if (!step) {
      throw new NotFoundException(`Workout howto perform step with ID ${id} not found`);
    }
    return step;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a workout howto perform step by ID',
    description: 'Update a workout howto perform step by ID',
    operationId: 'updateWorkoutHowtoPerformStep'
  })
  @ApiParam({
    name: 'id',
    description: 'Workout howto perform step ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated workout howto perform step',
    type: DetailsBaseWorkoutHowtoPerformStepDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout howto perform step not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseWorkoutHowtoPerformStepDto: UpdateBaseWorkoutHowtoPerformStepDto,
  ): Promise<DetailsBaseWorkoutHowtoPerformStepDto> {
    try {
      const step = await this.baseWorkoutHowtoPerformStepService.update(id, updateBaseWorkoutHowtoPerformStepDto) as unknown as DetailsBaseWorkoutHowtoPerformStepDto;
      if (!step) {
        throw new NotFoundException(`Workout howto perform step with ID ${id} not found`);
      }
      return step;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Workout howto perform step with this code already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a workout howto perform step by ID',
    description: 'Delete a workout howto perform step by ID',
    operationId: 'deleteWorkoutHowtoPerformStep'
  })
  @ApiParam({
    name: 'id',
    description: 'Workout howto perform step ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The workout howto perform step has been successfully deleted'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseWorkoutHowtoPerformStepService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Workout howto perform step with ID ${id} not found`);
    }
  }
} 