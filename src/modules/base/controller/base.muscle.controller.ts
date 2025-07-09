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

import {
  CreateBaseMuscleDto,
  UpdateBaseMuscleDto,
  PaginatedDetailsBaseMuscleDto,
  DetailsBaseMuscleDto
} from '../dto';

import { BaseMuscleService } from '../service';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/muscle")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseMuscleController {
  constructor(private readonly baseMuscleService: BaseMuscleService) {}

  @Post()
  @ApiOperation({
    operationId: 'createBaseMuscle',
    summary: 'Create a new muscle'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The muscle has been successfully created.',
    type: DetailsBaseMuscleDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  async create(@Body() createBaseMuscleDto: CreateBaseMuscleDto): Promise<DetailsBaseMuscleDto> {
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
  @ApiOperation({
    operationId: 'findAllBaseMuscles',
    summary: 'Get all muscles with pagination'
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
    description: 'Paginated list of muscles',
    type: PaginatedDetailsBaseMuscleDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedDetailsBaseMuscleDto> {
    return await this.baseMuscleService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({
    operationId: 'searchBaseMuscles',
    summary: 'Search muscles by query string with pagination'
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
    description: 'Paginated search results of muscles',
    type: PaginatedDetailsBaseMuscleDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseMuscleDto> {
    return this.baseMuscleService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({
    operationId: 'getBaseMuscleByCode',
    summary: 'Get muscle by code'
  })
  @ApiParam({
    name: 'code',
    description: 'Muscle code',
    required: true,
    type: SwaggerType.STRING
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found muscle',
    type: DetailsBaseMuscleDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Muscle not found'
  })
  async findByCode(@Param('code') code: string): Promise<DetailsBaseMuscleDto> {
    const muscle = await this.baseMuscleService.findByCode(code);
    if (!muscle) {
      throw new NotFoundException(`Muscle with code '${code}' not found`);
    }
    return muscle;
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getBaseMuscleById',
    summary: 'Get a specific muscle by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Muscle ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found muscle',
    type: DetailsBaseMuscleDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Muscle not found'
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsBaseMuscleDto> {
    const muscle = await this.baseMuscleService.findOne(id);
    if (!muscle) {
      throw new NotFoundException(`Muscle with ID ${id} not found`);
    }
    return muscle;
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'updateBaseMuscle',
    summary: 'Update a muscle by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Muscle ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated muscle',
    type: DetailsBaseMuscleDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Muscle not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseMuscleDto: UpdateBaseMuscleDto,
  ): Promise<DetailsBaseMuscleDto> {
    try {
      const muscle = await this.baseMuscleService.update(id, updateBaseMuscleDto);
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
  @ApiOperation({
    operationId: 'deleteBaseMuscle',
    summary: 'Delete a muscle by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Muscle ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The muscle has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Muscle not found'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseMuscleService.remove(id);
    if (!result) {
      throw new NotFoundException(`Muscle with ID ${id} not found`);
    }
  }
}
