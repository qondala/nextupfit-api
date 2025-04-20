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

import { BaseNutrientService } from '../service';
import { BaseNutrientEntity } from '../entity';
import { CreateBaseNutrientDto, UpdateBaseNutrientDto } from '../dto';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/nutrient")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseNutrientController {
  constructor(private readonly baseNutrientService: BaseNutrientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new nutrient' })
  @ApiResponse({ 
    status: 201, 
    description: 'The nutrient has been successfully created.',
    type: BaseNutrientEntity 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseNutrientDto: CreateBaseNutrientDto): Promise<BaseNutrientEntity> {
    try {
      return await this.baseNutrientService.create(createBaseNutrientDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Nutrient with this code already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all nutrients with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiQuery({ name: 'userId', description: 'Filter by creator user ID', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of nutrients',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedResponseDto<BaseNutrientEntity>> {
    return this.baseNutrientService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search nutrients by query string with pagination' })
  @ApiQuery({ name: 'q', description: 'Search query string', required: true })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated search results of nutrients',
    type: PaginatedResponseDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseNutrientEntity>> {
    return this.baseNutrientService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get nutrient by code' })
  @ApiParam({ name: 'code', description: 'Nutrient code' })
  @ApiResponse({
    status: 200,
    description: 'The found nutrient',
    type: BaseNutrientEntity
  })
  @ApiResponse({ status: 404, description: 'Nutrient not found' })
  async findByCode(@Param('code') code: string): Promise<BaseNutrientEntity> {
    const nutrient = await this.baseNutrientService.findByCode(code);
    if (!nutrient) {
      throw new NotFoundException(`Nutrient with code '${code}' not found`);
    }
    return nutrient;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific nutrient by ID' })
  @ApiParam({ name: 'id', description: 'Nutrient ID' })
  @ApiResponse({
    status: 200,
    description: 'The found nutrient',
    type: BaseNutrientEntity
  })
  @ApiResponse({ status: 404, description: 'Nutrient not found' })
  async findOne(@Param('id') id: string): Promise<BaseNutrientEntity> {
    const nutrient = await this.baseNutrientService.findOne(+id);
    if (!nutrient) {
      throw new NotFoundException(`Nutrient with ID ${id} not found`);
    }
    return nutrient;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a nutrient by ID' })
  @ApiParam({ name: 'id', description: 'Nutrient ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated nutrient',
    type: BaseNutrientEntity
  })
  @ApiResponse({ status: 404, description: 'Nutrient not found' })
  @ApiResponse({ status: 400, description: 'Bad request. Code already exists or invalid input.' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseNutrientDto: UpdateBaseNutrientDto,
  ): Promise<BaseNutrientEntity> {
    try {
      const nutrient = await this.baseNutrientService.update(+id, updateBaseNutrientDto);
      if (!nutrient) {
        throw new NotFoundException(`Nutrient with ID ${id} not found`);
      }
      return nutrient;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Nutrient with this code already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a nutrient by ID' })
  @ApiParam({ name: 'id', description: 'Nutrient ID' })
  @ApiResponse({ status: 204, description: 'The nutrient has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Nutrient not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseNutrientService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Nutrient with ID ${id} not found`);
    }
  }
} 