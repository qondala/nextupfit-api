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

import { CreateBaseWorkoutNutrientBurnDto, UpdateBaseWorkoutNutrientBurnDto } from '../dto';
import { BaseWorkoutNutrientBurnService } from '../service';
import { BaseWorkoutNutrientBurnEntity } from '../entity';



@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/workout/nutrient-burn")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseWorkoutNutrientBurnController {
  constructor(private readonly baseWorkoutNutrientBurnService: BaseWorkoutNutrientBurnService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout nutrient burn' })
  @ApiResponse({ 
    status: 201, 
    description: 'The workout nutrient burn has been successfully created.',
    type: BaseWorkoutNutrientBurnEntity 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseWorkoutNutrientBurnDto: CreateBaseWorkoutNutrientBurnDto): Promise<BaseWorkoutNutrientBurnEntity> {
    return await this.baseWorkoutNutrientBurnService.create(createBaseWorkoutNutrientBurnDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workout nutrient burns with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiQuery({ name: 'workoutId', description: 'Filter by workout ID', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of workout nutrient burns',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('workoutId') workoutId?: number
  ): Promise<PaginatedResponseDto<BaseWorkoutNutrientBurnEntity>> {
    return this.baseWorkoutNutrientBurnService.findAll({
      page: +page,
      limit: +limit
    }, workoutId ? +workoutId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific workout nutrient burn by ID' })
  @ApiParam({ name: 'id', description: 'Workout nutrient burn ID' })
  @ApiResponse({
    status: 200,
    description: 'The found workout nutrient burn',
    type: BaseWorkoutNutrientBurnEntity
  })
  @ApiResponse({ status: 404, description: 'Workout nutrient burn not found' })
  async findOne(@Param('id') id: string): Promise<BaseWorkoutNutrientBurnEntity> {
    const nutrientBurn = await this.baseWorkoutNutrientBurnService.findOne(+id);
    if (!nutrientBurn) {
      throw new NotFoundException(`Workout nutrient burn with ID ${id} not found`);
    }
    return nutrientBurn;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a workout nutrient burn by ID' })
  @ApiParam({ name: 'id', description: 'Workout nutrient burn ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated workout nutrient burn',
    type: BaseWorkoutNutrientBurnEntity
  })
  @ApiResponse({ status: 404, description: 'Workout nutrient burn not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseWorkoutNutrientBurnDto: UpdateBaseWorkoutNutrientBurnDto,
  ): Promise<BaseWorkoutNutrientBurnEntity> {
    const nutrientBurn = await this.baseWorkoutNutrientBurnService.update(+id, updateBaseWorkoutNutrientBurnDto);
    if (!nutrientBurn) {
      throw new NotFoundException(`Workout nutrient burn with ID ${id} not found`);
    }
    return nutrientBurn;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workout nutrient burn by ID' })
  @ApiParam({ name: 'id', description: 'Workout nutrient burn ID' })
  @ApiResponse({ status: 204, description: 'The workout nutrient burn has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Workout nutrient burn not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseWorkoutNutrientBurnService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Workout nutrient burn with ID ${id} not found`);
    }
  }
} 