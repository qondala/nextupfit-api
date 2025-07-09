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

import { SwaggerType } from '@app/common/types';
import { JwtAuthGuard, RolesGuard } from '@app/common/guards';

import {
  CreateBaseFoodDto,
  UpdateBaseFoodDto,
  DetailsBaseFoodDto,
  PaginatedDetailsBaseFoodDto
} from '../dto';

import { BaseFoodService } from '../service';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/food")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseFoodController {
  constructor(private readonly baseFoodService: BaseFoodService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new food',
    description: 'Create a new food with the given details',
    operationId: 'createBaseFood'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The food has been successfully created.',
    type: () => DetailsBaseFoodDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  async create(@Body() createBaseFoodDto: CreateBaseFoodDto): Promise<DetailsBaseFoodDto> {
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
  @ApiOperation({
    summary: 'Get all foods with pagination',
    operationId: 'findAllBaseFoods'
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
  @ApiQuery({
    name: 'foodGroupId',
    description: 'Filter by food group ID',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of foods',
    type: PaginatedDetailsBaseFoodDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number,
    @Query('foodGroupId') foodGroupId?: number
  ): Promise<PaginatedDetailsBaseFoodDto> {
    return this.baseFoodService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined, foodGroupId ? +foodGroupId : undefined);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search foods by query string with pagination',
    operationId: 'searchBaseFoods'
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
    description: 'Paginated search results of foods',
    type: PaginatedDetailsBaseFoodDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseFoodDto> {
    return this.baseFoodService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({
    summary: 'Get food by code',
    operationId: 'getFoodByCode'
  })
  @ApiParam({
    name: 'code',
    description: 'Food code'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found food',
    type: DetailsBaseFoodDto
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Food not found' })
  async findByCode(@Param('code') code: string): Promise<DetailsBaseFoodDto> {
    const food = await this.baseFoodService.findByCode(code);
    if (!food) {
      throw new NotFoundException(`Food with code '${code}' not found`);
    }
    return food;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific food by ID',
    operationId: 'getFoodById'
  })
  @ApiParam({
    name: 'id',
    description: 'Food ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found food',
    type: DetailsBaseFoodDto
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Food not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsBaseFoodDto> {
    const food = await this.baseFoodService.findOne(id);
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return food;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a food by ID',
    operationId: 'updateFoodById'
  })
  @ApiParam({
    name: 'id',
    description: 'Food ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated food',
    type: DetailsBaseFoodDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Food not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseFoodDto: UpdateBaseFoodDto,
  ): Promise<DetailsBaseFoodDto> {
    try {
      const food = await this.baseFoodService.update(id, updateBaseFoodDto);
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
  @ApiOperation({
    summary: 'Delete a food by ID',
    operationId: 'deleteFoodById'
  })
  @ApiParam({
    name: 'id',
    description: 'Food ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The food has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Food not found'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseFoodService.remove(id);
    if (!result) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
  }
}
