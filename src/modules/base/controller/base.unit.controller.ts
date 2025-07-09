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
  UseGuards
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth
} from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';

import { SwaggerType } from '@app/common/types';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import {
  CreateBaseUnitDto,
  UpdateBaseUnitDto,
  PaginatedDetailsBaseUnitDto,
  DetailsBaseUnitDto
} from '../dto';

import { BaseUnitService } from '../service';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/unit")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseUnitController {
  constructor(private readonly baseUnitService: BaseUnitService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new unit',
    description: 'Create a new unit',
    operationId: 'createUnit'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED,
    description: 'The unit has been successfully created.',
    type: DetailsBaseUnitDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  async create(@Body() createBaseUnitDto: CreateBaseUnitDto): Promise<DetailsBaseUnitDto> {
    try {
      return await this.baseUnitService.create(createBaseUnitDto) as unknown as DetailsBaseUnitDto;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Unit with this code already exists');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all units with pagination',
    description: 'Get all units with pagination',
    operationId: 'getAllUnits'
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
    description: 'Paginated list of units',
    type: PaginatedDetailsBaseUnitDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedDetailsBaseUnitDto> {
    return await this.baseUnitService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search units by query string with pagination',
    description: 'Search units by query string with pagination',
    operationId: 'searchUnits'
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
    description: 'Paginated search results of units',
    type: PaginatedDetailsBaseUnitDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseUnitDto> {
    return await this.baseUnitService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({
    summary: 'Get unit by code',
    description: 'Get unit by code',
    operationId: 'getUnitByCode'
  })
  @ApiParam({
    name: 'code',
    description: 'Unit code',
    required: true,
    type: SwaggerType.STRING
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found unit',
    type: DetailsBaseUnitDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unit not found'
  })
  async findByCode(@Param('code') code: string): Promise<DetailsBaseUnitDto> {
    const unit = await this.baseUnitService.findByCode(code);
    if (!unit) {
      throw new NotFoundException(`Unit with code '${code}' not found`);
    }
    return unit;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific unit by ID',
    description: 'Get a specific unit by ID',
    operationId: 'getUnitById'
  })
  @ApiParam({
    name: 'id',
    description: 'Unit ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found unit',
    type: DetailsBaseUnitDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unit not found'
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsBaseUnitDto> {
    const unit = await this.baseUnitService.findOne(+id);
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    }
    return unit;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a unit by ID',
    description: 'Update a unit by ID',
    operationId: 'updateUnitById'
  })
  @ApiParam({
    name: 'id',
    description: 'Unit ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated unit',
    type: DetailsBaseUnitDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unit not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseUnitDto: UpdateBaseUnitDto,
  ): Promise<DetailsBaseUnitDto> {
    try {
      const unit = await this.baseUnitService.update(id, updateBaseUnitDto) as unknown as DetailsBaseUnitDto;
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
  @ApiOperation({
    summary: 'Delete a unit by ID',
    description: 'Delete a unit by ID',
    operationId: 'deleteUnitById'
  })
  @ApiParam({
    name: 'id',
    description: 'Unit ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The unit has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unit not found'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseUnitService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    }
  }
} 