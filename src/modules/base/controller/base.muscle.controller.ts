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

import { BaseMuscleService } from '../service';
import { BaseMuscleEntity } from '../entity';
import { CreateBaseMuscleDto, UpdateBaseMuscleDto } from '../dto';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/muscle")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseMuscleController {
  constructor(private readonly baseMuscleService: BaseMuscleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new muscle' })
  @ApiResponse({ 
    status: 201, 
    description: 'The muscle has been successfully created.',
    type: BaseMuscleEntity 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseMuscleDto: CreateBaseMuscleDto): Promise<BaseMuscleEntity> {
    try {
      return await this.baseMuscleService.create(createBaseMuscleDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Muscle with this code already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all muscles with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiQuery({ name: 'userId', description: 'Filter by creator user ID', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of muscles',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedResponseDto<BaseMuscleEntity>> {
    return this.baseMuscleService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search muscles by query string with pagination' })
  @ApiQuery({ name: 'q', description: 'Search query string', required: true })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated search results of muscles',
    type: PaginatedResponseDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseMuscleEntity>> {
    return this.baseMuscleService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get muscle by code' })
  @ApiParam({ name: 'code', description: 'Muscle code' })
  @ApiResponse({
    status: 200,
    description: 'The found muscle',
    type: BaseMuscleEntity
  })
  @ApiResponse({ status: 404, description: 'Muscle not found' })
  async findByCode(@Param('code') code: string): Promise<BaseMuscleEntity> {
    const muscle = await this.baseMuscleService.findByCode(code);
    if (!muscle) {
      throw new NotFoundException(`Muscle with code '${code}' not found`);
    }
    return muscle;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific muscle by ID' })
  @ApiParam({ name: 'id', description: 'Muscle ID' })
  @ApiResponse({
    status: 200,
    description: 'The found muscle',
    type: BaseMuscleEntity
  })
  @ApiResponse({ status: 404, description: 'Muscle not found' })
  async findOne(@Param('id') id: string): Promise<BaseMuscleEntity> {
    const muscle = await this.baseMuscleService.findOne(+id);
    if (!muscle) {
      throw new NotFoundException(`Muscle with ID ${id} not found`);
    }
    return muscle;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a muscle by ID' })
  @ApiParam({ name: 'id', description: 'Muscle ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated muscle',
    type: BaseMuscleEntity
  })
  @ApiResponse({ status: 404, description: 'Muscle not found' })
  @ApiResponse({ status: 400, description: 'Bad request. Code already exists or invalid input.' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseMuscleDto: UpdateBaseMuscleDto,
  ): Promise<BaseMuscleEntity> {
    try {
      const muscle = await this.baseMuscleService.update(+id, updateBaseMuscleDto);
      if (!muscle) {
        throw new NotFoundException(`Muscle with ID ${id} not found`);
      }
      return muscle;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Muscle with this code already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a muscle by ID' })
  @ApiParam({ name: 'id', description: 'Muscle ID' })
  @ApiResponse({ status: 204, description: 'The muscle has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Muscle not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseMuscleService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Muscle with ID ${id} not found`);
    }
  }
} 