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

import { BaseMealService } from '../service';

import {
  CreateBaseMealDto,
  UpdateBaseMealDto,
  PaginatedDetailsBaseMealDto,
  DetailsBaseMealDto
} from '../dto';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/meal")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseMealController {
  constructor(private readonly baseMealService: BaseMealService) {}

  @Post()
  @ApiOperation({
    operationId: 'createBaseMeal',
    summary: 'Create a new meal'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The meal has been successfully created.',
    type: DetailsBaseMealDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  async create(@Body() createBaseMealDto: CreateBaseMealDto): Promise<DetailsBaseMealDto> {
    try {
      return await this.baseMealService.create(createBaseMealDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Meal with this code already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    operationId: 'findAllBaseMeals',
    summary: 'Get all meals with pagination'
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
    name: 'userId',
    description: 'Filter by creator user ID',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of meals',
    type: PaginatedDetailsBaseMealDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedDetailsBaseMealDto> {
    return await this.baseMealService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({
    operationId: 'searchBaseMeals',
    summary: 'Search meals by query string with pagination'
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
    description: 'Paginated search results of meals',
    type: PaginatedDetailsBaseMealDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseMealDto> {
    return this.baseMealService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({
    operationId: 'getBaseMealByCode',
    summary: 'Get meal by code'
  })
  @ApiParam({
    name: 'code',
    description: 'Meal code',
    required: true,
    type: SwaggerType.STRING
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found meal',
    type: DetailsBaseMealDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal not found'
  })
  async findByCode(@Param('code') code: string): Promise<DetailsBaseMealDto> {
    const meal = await this.baseMealService.findByCode(code);
    if (!meal) {
      throw new NotFoundException(`Meal with code '${code}' not found`);
    }
    return meal;
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getBaseMealById',
    summary: 'Get a specific meal by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Meal ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found meal',
    type: DetailsBaseMealDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal not found'
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsBaseMealDto> {
    const meal = await this.baseMealService.findOne(id);
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    return meal;
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'updateBaseMeal',
    summary: 'Update a meal by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Meal ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated meal',
    type: DetailsBaseMealDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseMealDto: UpdateBaseMealDto,
  ): Promise<DetailsBaseMealDto> {
    try {
      const meal = await this.baseMealService.update(id, updateBaseMealDto);
      if (!meal) {
        throw new NotFoundException(`Meal with ID ${id} not found`);
      }
      return meal;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Meal with this code already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteBaseMeal',
    summary: 'Delete a meal by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Meal ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The meal has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Meal not found'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseMealService.remove(id);
    if (!result) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
  }
}
