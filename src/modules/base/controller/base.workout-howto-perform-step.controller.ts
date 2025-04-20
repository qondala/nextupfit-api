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
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto } from '@app/common/dto';

import { BaseWorkoutHowtoPerformStepService } from '../service';
import { BaseWorkoutHowtoPerformStepEntity } from '../entity';
import { CreateBaseWorkoutHowtoPerformStepDto, UpdateBaseWorkoutHowtoPerformStepDto } from '../dto';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/workout/howto-perform-step")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseWorkoutHowtoPerformStepController {
  constructor(private readonly baseWorkoutHowtoPerformStepService: BaseWorkoutHowtoPerformStepService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout howto perform step' })
  @ApiResponse({ 
    status: 201, 
    description: 'The workout howto perform step has been successfully created.',
    type: BaseWorkoutHowtoPerformStepEntity 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseWorkoutHowtoPerformStepDto: CreateBaseWorkoutHowtoPerformStepDto): Promise<BaseWorkoutHowtoPerformStepEntity> {
    try {
      return await this.baseWorkoutHowtoPerformStepService.create(createBaseWorkoutHowtoPerformStepDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Workout howto perform step with this code already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all workout howto perform steps with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiQuery({ name: 'workoutId', description: 'Filter by workout ID', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of workout howto perform steps',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('workoutId') workoutId?: number
  ): Promise<PaginatedResponseDto<BaseWorkoutHowtoPerformStepEntity>> {
    return this.baseWorkoutHowtoPerformStepService.findAll({
      page: +page,
      limit: +limit
    }, workoutId ? +workoutId : undefined);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search workout howto perform steps by query string with pagination' })
  @ApiQuery({ name: 'q', description: 'Search query string', required: true })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated search results of workout howto perform steps',
    type: PaginatedResponseDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseWorkoutHowtoPerformStepEntity>> {
    return this.baseWorkoutHowtoPerformStepService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get workout howto perform step by code' })
  @ApiParam({ name: 'code', description: 'Workout howto perform step code' })
  @ApiResponse({
    status: 200,
    description: 'The found workout howto perform step',
    type: BaseWorkoutHowtoPerformStepEntity
  })
  @ApiResponse({ status: 404, description: 'Workout howto perform step not found' })
  async findByCode(@Param('code') code: string): Promise<BaseWorkoutHowtoPerformStepEntity> {
    const step = await this.baseWorkoutHowtoPerformStepService.findByCode(code);
    if (!step) {
      throw new NotFoundException(`Workout howto perform step with code '${code}' not found`);
    }
    return step;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific workout howto perform step by ID' })
  @ApiParam({ name: 'id', description: 'Workout howto perform step ID' })
  @ApiResponse({
    status: 200,
    description: 'The found workout howto perform step',
    type: BaseWorkoutHowtoPerformStepEntity
  })
  @ApiResponse({ status: 404, description: 'Workout howto perform step not found' })
  async findOne(@Param('id') id: string): Promise<BaseWorkoutHowtoPerformStepEntity> {
    const step = await this.baseWorkoutHowtoPerformStepService.findOne(+id);
    if (!step) {
      throw new NotFoundException(`Workout howto perform step with ID ${id} not found`);
    }
    return step;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a workout howto perform step by ID' })
  @ApiParam({ name: 'id', description: 'Workout howto perform step ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated workout howto perform step',
    type: BaseWorkoutHowtoPerformStepEntity
  })
  @ApiResponse({ status: 404, description: 'Workout howto perform step not found' })
  @ApiResponse({ status: 400, description: 'Bad request. Code already exists or invalid input.' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseWorkoutHowtoPerformStepDto: UpdateBaseWorkoutHowtoPerformStepDto,
  ): Promise<BaseWorkoutHowtoPerformStepEntity> {
    try {
      const step = await this.baseWorkoutHowtoPerformStepService.update(+id, updateBaseWorkoutHowtoPerformStepDto);
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
  @ApiOperation({ summary: 'Delete a workout howto perform step by ID' })
  @ApiParam({ name: 'id', description: 'Workout howto perform step ID' })
  @ApiResponse({ status: 204, description: 'The workout howto perform step has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Workout howto perform step not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseWorkoutHowtoPerformStepService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Workout howto perform step with ID ${id} not found`);
    }
  }
} 