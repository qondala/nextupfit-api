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

import { BaseMealService } from '../service';
import { BaseMealEntity } from '../entity';
import { CreateBaseMealDto, UpdateBaseMealDto } from '../dto';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/meal")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseMealController {
  constructor(private readonly baseMealService: BaseMealService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new meal' })
  @ApiResponse({ 
    status: 201, 
    description: 'The meal has been successfully created.',
    type: BaseMealEntity 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseMealDto: CreateBaseMealDto): Promise<BaseMealEntity> {
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
  @ApiOperation({ summary: 'Get all meals with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiQuery({ name: 'userId', description: 'Filter by creator user ID', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of meals',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedResponseDto<BaseMealEntity>> {
    return this.baseMealService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search meals by query string with pagination' })
  @ApiQuery({ name: 'q', description: 'Search query string', required: true })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated search results of meals',
    type: PaginatedResponseDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseMealEntity>> {
    return this.baseMealService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get meal by code' })
  @ApiParam({ name: 'code', description: 'Meal code' })
  @ApiResponse({
    status: 200,
    description: 'The found meal',
    type: BaseMealEntity
  })
  @ApiResponse({ status: 404, description: 'Meal not found' })
  async findByCode(@Param('code') code: string): Promise<BaseMealEntity> {
    const meal = await this.baseMealService.findByCode(code);
    if (!meal) {
      throw new NotFoundException(`Meal with code '${code}' not found`);
    }
    return meal;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific meal by ID' })
  @ApiParam({ name: 'id', description: 'Meal ID' })
  @ApiResponse({
    status: 200,
    description: 'The found meal',
    type: BaseMealEntity
  })
  @ApiResponse({ status: 404, description: 'Meal not found' })
  async findOne(@Param('id') id: string): Promise<BaseMealEntity> {
    const meal = await this.baseMealService.findOne(+id);
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    return meal;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a meal by ID' })
  @ApiParam({ name: 'id', description: 'Meal ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated meal',
    type: BaseMealEntity
  })
  @ApiResponse({ status: 404, description: 'Meal not found' })
  @ApiResponse({ status: 400, description: 'Bad request. Code already exists or invalid input.' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseMealDto: UpdateBaseMealDto,
  ): Promise<BaseMealEntity> {
    try {
      const meal = await this.baseMealService.update(+id, updateBaseMealDto);
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
  @ApiOperation({ summary: 'Delete a meal by ID' })
  @ApiParam({ name: 'id', description: 'Meal ID' })
  @ApiResponse({ status: 204, description: 'The meal has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Meal not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseMealService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
  }
}
