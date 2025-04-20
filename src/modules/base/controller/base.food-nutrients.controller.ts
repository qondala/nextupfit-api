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

import { BaseFoodNutrientsService } from '../service';
import { BaseFoodNutrientsEntity } from '../entity';
import { CreateBaseFoodNutrientsDto, UpdateBaseFoodNutrientsDto } from '../dto';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/food-nutrients")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseFoodNutrientsController {
  constructor(private readonly baseFoodNutrientsService: BaseFoodNutrientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new food nutrient relationship' })
  @ApiResponse({ 
    status: 201, 
    description: 'The food nutrient relationship has been successfully created.',
    type: BaseFoodNutrientsEntity 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseFoodNutrientsDto: CreateBaseFoodNutrientsDto): Promise<BaseFoodNutrientsEntity> {
    try {
      return await this.baseFoodNutrientsService.create(createBaseFoodNutrientsDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Food nutrient relationship with this code already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all food nutrient relationships with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of food nutrient relationships',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseFoodNutrientsEntity>> {
    return this.baseFoodNutrientsService.findAll({
      page: +page,
      limit: +limit
    });
  }

  @Get('search')
  @ApiOperation({ summary: 'Search food nutrient relationships by code' })
  @ApiQuery({ name: 'q', description: 'Search query string', required: true })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated search results of food nutrient relationships',
    type: PaginatedResponseDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseFoodNutrientsEntity>> {
    return this.baseFoodNutrientsService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('food/:foodId')
  @ApiOperation({ summary: 'Get food nutrient relationships by food ID' })
  @ApiParam({ name: 'foodId', description: 'Food ID' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of food nutrient relationships for the specified food',
    type: PaginatedResponseDto
  })
  async findByFoodId(
    @Param('foodId') foodId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseFoodNutrientsEntity>> {
    return this.baseFoodNutrientsService.findByFoodId(+foodId, {
      page: +page,
      limit: +limit
    });
  }

  @Get('nutrient/:nutrientId')
  @ApiOperation({ summary: 'Get food nutrient relationships by nutrient ID' })
  @ApiParam({ name: 'nutrientId', description: 'Nutrient ID' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of food nutrient relationships for the specified nutrient',
    type: PaginatedResponseDto
  })
  async findByNutrientId(
    @Param('nutrientId') nutrientId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseFoodNutrientsEntity>> {
    return this.baseFoodNutrientsService.findByNutrientId(+nutrientId, {
      page: +page,
      limit: +limit
    });
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get food nutrient relationships by creator user ID' })
  @ApiParam({ name: 'userId', description: 'Creator user ID' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of food nutrient relationships created by the specified user',
    type: PaginatedResponseDto
  })
  async findByCreatedByUserId(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseFoodNutrientsEntity>> {
    return this.baseFoodNutrientsService.findByCreatedByUserId(+userId, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get food nutrient relationship by code' })
  @ApiParam({ name: 'code', description: 'Food nutrient relationship code' })
  @ApiResponse({
    status: 200,
    description: 'The found food nutrient relationship',
    type: BaseFoodNutrientsEntity
  })
  @ApiResponse({ status: 404, description: 'Food nutrient relationship not found' })
  async findByCode(@Param('code') code: string): Promise<BaseFoodNutrientsEntity> {
    const foodNutrient = await this.baseFoodNutrientsService.findByCode(code);
    if (!foodNutrient) {
      throw new NotFoundException(`Food nutrient relationship with code '${code}' not found`);
    }
    return foodNutrient;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific food nutrient relationship by ID' })
  @ApiParam({ name: 'id', description: 'Food nutrient relationship ID' })
  @ApiResponse({
    status: 200,
    description: 'The found food nutrient relationship',
    type: BaseFoodNutrientsEntity
  })
  @ApiResponse({ status: 404, description: 'Food nutrient relationship not found' })
  async findOne(@Param('id') id: string): Promise<BaseFoodNutrientsEntity> {
    const foodNutrient = await this.baseFoodNutrientsService.findOne(+id);
    if (!foodNutrient) {
      throw new NotFoundException(`Food nutrient relationship with ID ${id} not found`);
    }
    return foodNutrient;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a food nutrient relationship by ID' })
  @ApiParam({ name: 'id', description: 'Food nutrient relationship ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated food nutrient relationship',
    type: BaseFoodNutrientsEntity
  })
  @ApiResponse({ status: 404, description: 'Food nutrient relationship not found' })
  @ApiResponse({ status: 400, description: 'Bad request. Code already exists or invalid input.' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseFoodNutrientsDto: UpdateBaseFoodNutrientsDto,
  ): Promise<BaseFoodNutrientsEntity> {
    try {
      const foodNutrient = await this.baseFoodNutrientsService.update(+id, updateBaseFoodNutrientsDto);
      if (!foodNutrient) {
        throw new NotFoundException(`Food nutrient relationship with ID ${id} not found`);
      }
      return foodNutrient;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Food nutrient relationship with this code already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a food nutrient relationship by ID' })
  @ApiParam({ name: 'id', description: 'Food nutrient relationship ID' })
  @ApiResponse({ status: 204, description: 'The food nutrient relationship has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Food nutrient relationship not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseFoodNutrientsService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Food nutrient relationship with ID ${id} not found`);
    }
  }
}
