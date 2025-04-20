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

import { BaseFoodService } from '../service';
import { BaseFoodEntity } from '../entity';
import { CreateBaseFoodDto, UpdateBaseFoodDto } from '../dto';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/food")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseFoodController {
  constructor(private readonly baseFoodService: BaseFoodService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new food' })
  @ApiResponse({ 
    status: 201, 
    description: 'The food has been successfully created.',
    type: BaseFoodEntity 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseFoodDto: CreateBaseFoodDto): Promise<BaseFoodEntity> {
    try {
      return await this.baseFoodService.create(createBaseFoodDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Food with this code already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all foods with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiQuery({ name: 'userId', description: 'Filter by creator user ID', required: false, type: Number })
  @ApiQuery({ name: 'foodGroupId', description: 'Filter by food group ID', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of foods',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number,
    @Query('foodGroupId') foodGroupId?: number
  ): Promise<PaginatedResponseDto<BaseFoodEntity>> {
    return this.baseFoodService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined, foodGroupId ? +foodGroupId : undefined);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search foods by query string with pagination' })
  @ApiQuery({ name: 'q', description: 'Search query string', required: true })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated search results of foods',
    type: PaginatedResponseDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseFoodEntity>> {
    return this.baseFoodService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get food by code' })
  @ApiParam({ name: 'code', description: 'Food code' })
  @ApiResponse({
    status: 200,
    description: 'The found food',
    type: BaseFoodEntity
  })
  @ApiResponse({ status: 404, description: 'Food not found' })
  async findByCode(@Param('code') code: string): Promise<BaseFoodEntity> {
    const food = await this.baseFoodService.findByCode(code);
    if (!food) {
      throw new NotFoundException(`Food with code '${code}' not found`);
    }
    return food;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific food by ID' })
  @ApiParam({ name: 'id', description: 'Food ID' })
  @ApiResponse({
    status: 200,
    description: 'The found food',
    type: BaseFoodEntity
  })
  @ApiResponse({ status: 404, description: 'Food not found' })
  async findOne(@Param('id') id: string): Promise<BaseFoodEntity> {
    const food = await this.baseFoodService.findOne(+id);
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return food;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a food by ID' })
  @ApiParam({ name: 'id', description: 'Food ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated food',
    type: BaseFoodEntity
  })
  @ApiResponse({ status: 404, description: 'Food not found' })
  @ApiResponse({ status: 400, description: 'Bad request. Code already exists or invalid input.' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseFoodDto: UpdateBaseFoodDto,
  ): Promise<BaseFoodEntity> {
    try {
      const food = await this.baseFoodService.update(+id, updateBaseFoodDto);
      if (!food) {
        throw new NotFoundException(`Food with ID ${id} not found`);
      }
      return food;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Food with this code already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a food by ID' })
  @ApiParam({ name: 'id', description: 'Food ID' })
  @ApiResponse({ status: 204, description: 'The food has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Food not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseFoodService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
  }
} 