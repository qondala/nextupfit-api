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
import {
  JwtAuthGuard,
  RolesGuard
} from '@app/common/guards';

import {
  CreateBaseWorkoutNutrientBurnDto,
  UpdateBaseWorkoutNutrientBurnDto,
  PaginatedDetailsBaseWorkoutNutrientBurnDto,
  DetailsBaseWorkoutNutrientBurnDto
} from '../dto';

import { BaseWorkoutNutrientBurnService } from '../service';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/workout/nutrient-burn")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseWorkoutNutrientBurnController {
  constructor(private readonly baseWorkoutNutrientBurnService: BaseWorkoutNutrientBurnService) {}

  @Post()
  @ApiOperation({
    operationId: 'createBaseWorkoutNutrientBurn',
    summary: 'Create a new workout nutrient burn'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The workout nutrient burn has been successfully created.',
    type: DetailsBaseWorkoutNutrientBurnDto 
  })
  async create(@Body() createBaseWorkoutNutrientBurnDto: CreateBaseWorkoutNutrientBurnDto): Promise<DetailsBaseWorkoutNutrientBurnDto> {
    return await this.baseWorkoutNutrientBurnService.create(createBaseWorkoutNutrientBurnDto) as unknown as DetailsBaseWorkoutNutrientBurnDto;
  }

  @Get()
  @ApiOperation({
    operationId: 'getBaseWorkoutNutrientBurns',
    summary: 'Get all workout nutrient burns with pagination'
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
    status: 200,
    description: 'Paginated list of workout nutrient burns',
    type: PaginatedDetailsBaseWorkoutNutrientBurnDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('workoutId') workoutId?: number
  ): Promise<PaginatedDetailsBaseWorkoutNutrientBurnDto> {
    return await this.baseWorkoutNutrientBurnService.findAll({
      page: +page,
      limit: +limit
    }, workoutId ? +workoutId : undefined);
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getBaseWorkoutNutrientBurnById',
    summary: 'Get a specific workout nutrient burn by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Workout nutrient burn ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found workout nutrient burn',
    type: DetailsBaseWorkoutNutrientBurnDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout nutrient burn not found'
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsBaseWorkoutNutrientBurnDto> {
    const nutrientBurn = await this.baseWorkoutNutrientBurnService.findOne(id) as unknown as DetailsBaseWorkoutNutrientBurnDto;
    if (!nutrientBurn) {
      throw new NotFoundException(`Workout nutrient burn with ID ${id} not found`);
    }
    return nutrientBurn;
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'updateBaseWorkoutNutrientBurn',
    summary: 'Update a workout nutrient burn by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Workout nutrient burn ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated workout nutrient burn',
    type: DetailsBaseWorkoutNutrientBurnDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout nutrient burn not found'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseWorkoutNutrientBurnDto: UpdateBaseWorkoutNutrientBurnDto,
  ): Promise<DetailsBaseWorkoutNutrientBurnDto> {
    const nutrientBurn = await this.baseWorkoutNutrientBurnService.update(id, updateBaseWorkoutNutrientBurnDto) as unknown as DetailsBaseWorkoutNutrientBurnDto;
    if (!nutrientBurn) {
      throw new NotFoundException(`Workout nutrient burn with ID ${id} not found`);
    }
    return nutrientBurn;
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteBaseWorkoutNutrientBurn',
    summary: 'Delete a workout nutrient burn by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Workout nutrient burn ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The workout nutrient burn has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Workout nutrient burn not found'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseWorkoutNutrientBurnService.remove(id);
    if (!result) {
      throw new NotFoundException(`Workout nutrient burn with ID ${id} not found`);
    }
  }
}
