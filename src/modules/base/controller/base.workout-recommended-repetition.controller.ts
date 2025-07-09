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

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { SwaggerType } from '@app/common/types';

import {
  CreateBaseWorkoutRecommendedRepetitionDto,
  UpdateBaseWorkoutRecommendedRepetitionDto,
  PaginatedDetailsBaseWorkoutRecommendedRepetitionDto,
  DetailsBaseWorkoutRecommendedRepetitionDto
} from '../dto';

import { BaseWorkoutRecommendedRepetitionService } from '../service';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/workout/recommended-repetition")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseWorkoutRecommendedRepetitionController {
  constructor(private readonly baseWorkoutRecommendedRepetitionService: BaseWorkoutRecommendedRepetitionService) {}

  @Post()
  @ApiOperation({
    operationId: 'createBaseWorkoutRecommendedRepetition',
    summary: 'Create a new workout recommended repetition'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The workout recommended repetition has been successfully created.',
    type: DetailsBaseWorkoutRecommendedRepetitionDto 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseWorkoutRecommendedRepetitionDto: CreateBaseWorkoutRecommendedRepetitionDto): Promise<DetailsBaseWorkoutRecommendedRepetitionDto> {
    return await this.baseWorkoutRecommendedRepetitionService.create(createBaseWorkoutRecommendedRepetitionDto) as unknown as DetailsBaseWorkoutRecommendedRepetitionDto;
  }

  @Get()
  @ApiOperation({
    operationId: 'getBaseWorkoutRecommendedRepetitions',
    summary: 'Get all workout recommended repetitions with pagination'
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
    description: 'Paginated list of workout recommended repetitions',
    type: PaginatedDetailsBaseWorkoutRecommendedRepetitionDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('workoutId') workoutId?: number
  ): Promise<PaginatedDetailsBaseWorkoutRecommendedRepetitionDto> {
    return await this.baseWorkoutRecommendedRepetitionService.findAll({
      page: +page,
      limit: +limit
    }, workoutId ? +workoutId : undefined);
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getBaseWorkoutRecommendedRepetitionById',
    summary: 'Get a specific workout recommended repetition by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Workout recommended repetition ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found workout recommended repetition',
    type: DetailsBaseWorkoutRecommendedRepetitionDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout recommended repetition not found',
    type: NotFoundException
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsBaseWorkoutRecommendedRepetitionDto> {
    const repetition = await this.baseWorkoutRecommendedRepetitionService.findOne(id);
    if (!repetition) {
      throw new NotFoundException(`Workout recommended repetition with ID ${id} not found`);
    }
    return repetition;
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'updateBaseWorkoutRecommendedRepetition',
    summary: 'Update a workout recommended repetition by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Workout recommended repetition ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated workout recommended repetition',
    type: DetailsBaseWorkoutRecommendedRepetitionDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout recommended repetition not found',
    type: NotFoundException
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseWorkoutRecommendedRepetitionDto: UpdateBaseWorkoutRecommendedRepetitionDto,
  ): Promise<DetailsBaseWorkoutRecommendedRepetitionDto> {
    const repetition = await this.baseWorkoutRecommendedRepetitionService.update(id, updateBaseWorkoutRecommendedRepetitionDto) as unknown as DetailsBaseWorkoutRecommendedRepetitionDto;
    if (!repetition) {
      throw new NotFoundException(`Workout recommended repetition with ID ${id} not found`);
    }
    return repetition;
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteBaseWorkoutRecommendedRepetition',
    summary: 'Delete a workout recommended repetition by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Workout recommended repetition ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The workout recommended repetition has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout recommended repetition not found',
    type: NotFoundException
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseWorkoutRecommendedRepetitionService.remove(id);
    if (!result) {
      throw new NotFoundException(`Workout recommended repetition with ID ${id} not found`);
    }
  }
} 