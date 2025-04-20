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
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';

import { PaginatedResponseDto } from '@app/common/dto';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';

import { BaseWorkoutRecommendedRepetitionService } from '../service';
import { BaseWorkoutRecommendedRepetitionEntity } from '../entity';
import { CreateBaseWorkoutRecommendedRepetitionDto, UpdateBaseWorkoutRecommendedRepetitionDto } from '../dto';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/workout/recommended-repetition")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseWorkoutRecommendedRepetitionController {
  constructor(private readonly baseWorkoutRecommendedRepetitionService: BaseWorkoutRecommendedRepetitionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout recommended repetition' })
  @ApiResponse({ 
    status: 201, 
    description: 'The workout recommended repetition has been successfully created.',
    type: BaseWorkoutRecommendedRepetitionEntity 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseWorkoutRecommendedRepetitionDto: CreateBaseWorkoutRecommendedRepetitionDto): Promise<BaseWorkoutRecommendedRepetitionEntity> {
    return await this.baseWorkoutRecommendedRepetitionService.create(createBaseWorkoutRecommendedRepetitionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workout recommended repetitions with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiQuery({ name: 'workoutId', description: 'Filter by workout ID', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of workout recommended repetitions',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('workoutId') workoutId?: number
  ): Promise<PaginatedResponseDto<BaseWorkoutRecommendedRepetitionEntity>> {
    return this.baseWorkoutRecommendedRepetitionService.findAll({
      page: +page,
      limit: +limit
    }, workoutId ? +workoutId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific workout recommended repetition by ID' })
  @ApiParam({ name: 'id', description: 'Workout recommended repetition ID' })
  @ApiResponse({
    status: 200,
    description: 'The found workout recommended repetition',
    type: BaseWorkoutRecommendedRepetitionEntity
  })
  @ApiResponse({ status: 404, description: 'Workout recommended repetition not found' })
  async findOne(@Param('id') id: string): Promise<BaseWorkoutRecommendedRepetitionEntity> {
    const repetition = await this.baseWorkoutRecommendedRepetitionService.findOne(+id);
    if (!repetition) {
      throw new NotFoundException(`Workout recommended repetition with ID ${id} not found`);
    }
    return repetition;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a workout recommended repetition by ID' })
  @ApiParam({ name: 'id', description: 'Workout recommended repetition ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated workout recommended repetition',
    type: BaseWorkoutRecommendedRepetitionEntity
  })
  @ApiResponse({ status: 404, description: 'Workout recommended repetition not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseWorkoutRecommendedRepetitionDto: UpdateBaseWorkoutRecommendedRepetitionDto,
  ): Promise<BaseWorkoutRecommendedRepetitionEntity> {
    const repetition = await this.baseWorkoutRecommendedRepetitionService.update(+id, updateBaseWorkoutRecommendedRepetitionDto);
    if (!repetition) {
      throw new NotFoundException(`Workout recommended repetition with ID ${id} not found`);
    }
    return repetition;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workout recommended repetition by ID' })
  @ApiParam({ name: 'id', description: 'Workout recommended repetition ID' })
  @ApiResponse({ status: 204, description: 'The workout recommended repetition has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Workout recommended repetition not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseWorkoutRecommendedRepetitionService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Workout recommended repetition with ID ${id} not found`);
    }
  }
} 