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

import { BaseUnitService } from '../service';
import { BaseUnitEntity } from '../entity';
import { CreateBaseUnitDto, UpdateBaseUnitDto } from '../dto';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/unit")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseUnitController {
  constructor(private readonly baseUnitService: BaseUnitService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new unit' })
  @ApiResponse({ 
    status: 201, 
    description: 'The unit has been successfully created.',
    type: BaseUnitEntity 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseUnitDto: CreateBaseUnitDto): Promise<BaseUnitEntity> {
    try {
      return await this.baseUnitService.create(createBaseUnitDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Unit with this code already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all units with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiQuery({ name: 'userId', description: 'Filter by creator user ID', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of units',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedResponseDto<BaseUnitEntity>> {
    return this.baseUnitService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search units by query string with pagination' })
  @ApiQuery({ name: 'q', description: 'Search query string', required: true })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated search results of units',
    type: PaginatedResponseDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseUnitEntity>> {
    return this.baseUnitService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get unit by code' })
  @ApiParam({ name: 'code', description: 'Unit code' })
  @ApiResponse({
    status: 200,
    description: 'The found unit',
    type: BaseUnitEntity
  })
  @ApiResponse({ status: 404, description: 'Unit not found' })
  async findByCode(@Param('code') code: string): Promise<BaseUnitEntity> {
    const unit = await this.baseUnitService.findByCode(code);
    if (!unit) {
      throw new NotFoundException(`Unit with code '${code}' not found`);
    }
    return unit;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific unit by ID' })
  @ApiParam({ name: 'id', description: 'Unit ID' })
  @ApiResponse({
    status: 200,
    description: 'The found unit',
    type: BaseUnitEntity
  })
  @ApiResponse({ status: 404, description: 'Unit not found' })
  async findOne(@Param('id') id: string): Promise<BaseUnitEntity> {
    const unit = await this.baseUnitService.findOne(+id);
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    }
    return unit;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a unit by ID' })
  @ApiParam({ name: 'id', description: 'Unit ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated unit',
    type: BaseUnitEntity
  })
  @ApiResponse({ status: 404, description: 'Unit not found' })
  @ApiResponse({ status: 400, description: 'Bad request. Code already exists or invalid input.' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseUnitDto: UpdateBaseUnitDto,
  ): Promise<BaseUnitEntity> {
    try {
      const unit = await this.baseUnitService.update(+id, updateBaseUnitDto);
      if (!unit) {
        throw new NotFoundException(`Unit with ID ${id} not found`);
      }
      return unit;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Unit with this code already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a unit by ID' })
  @ApiParam({ name: 'id', description: 'Unit ID' })
  @ApiResponse({ status: 204, description: 'The unit has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Unit not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseUnitService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    }
  }
} 