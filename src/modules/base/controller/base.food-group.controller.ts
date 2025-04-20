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

import { ErrorResponseException, ErrorResponseExceptionType, SystemStatusCode } from '@app/common/exceptions';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { PaginatedResponseDto } from '@app/common/dto';

import { BaseFoodGroupService } from '../service';
import { BaseFoodGroupEntity } from '../entity';
import { CreateBaseFoodGroupDto, UpdateBaseFoodGroupDto } from '../dto';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/food-group")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseFoodGroupController {
  constructor(private readonly baseFoodGroupService: BaseFoodGroupService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new food group' })
  @ApiResponse({ 
    status: HttpStatus.CREATED,
    description: 'The food group has been successfully created.',
    type: BaseFoodGroupEntity 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.',
    type: ErrorResponseException
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBaseFoodGroupDto: CreateBaseFoodGroupDto): Promise<BaseFoodGroupEntity> {
    try {
      return await this.baseFoodGroupService.create(createBaseFoodGroupDto);
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new ErrorResponseException(
          ErrorResponseExceptionType.DATABASE,
          'Food group with this code already exists',
          HttpStatus.BAD_REQUEST,
          SystemStatusCode.DUPLICATE
        );
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all food groups with pagination' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiQuery({ name: 'userId', description: 'Filter by creator user ID', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of food groups',
    type: PaginatedResponseDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedResponseDto<BaseFoodGroupEntity>> {
    return this.baseFoodGroupService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search food groups by query string with pagination' })
  @ApiQuery({ name: 'q', description: 'Search query string', required: true })
  @ApiQuery({ name: 'page', description: 'Page number', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Number of items per page', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated search results of food groups',
    type: PaginatedResponseDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedResponseDto<BaseFoodGroupEntity>> {
    return this.baseFoodGroupService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get food group by code' })
  @ApiParam({ name: 'code', description: 'Food group code' })
  @ApiResponse({
    status: 200,
    description: 'The found food group',
    type: BaseFoodGroupEntity
  })
  @ApiResponse({ status: 404, description: 'Food group not found' })
  async findByCode(@Param('code') code: string): Promise<BaseFoodGroupEntity> {
    const foodGroup = await this.baseFoodGroupService.findByCode(code);
    if (!foodGroup) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.HTTP,
        `Food group with code '${code}' not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.GENERIC
      );
    }
    return foodGroup;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific food group by ID' })
  @ApiParam({ name: 'id', description: 'Food group ID' })
  @ApiResponse({
    status: 200,
    description: 'The found food group',
    type: BaseFoodGroupEntity
  })
  @ApiResponse({ status: 404, description: 'Food group not found' })
  async findOne(@Param('id') id: string): Promise<BaseFoodGroupEntity> {
    const foodGroup = await this.baseFoodGroupService.findOne(+id);
    if (!foodGroup) {
      throw new NotFoundException(`Food group with ID ${id} not found`);
    }
    return foodGroup;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a food group by ID' })
  @ApiParam({ name: 'id', description: 'Food group ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated food group',
    type: BaseFoodGroupEntity
  })
  @ApiResponse({ status: 404, description: 'Food group not found' })
  @ApiResponse({ status: 400, description: 'Bad request. Code already exists or invalid input.' })
  async update(
    @Param('id') id: string,
    @Body() updateBaseFoodGroupDto: UpdateBaseFoodGroupDto,
  ): Promise<BaseFoodGroupEntity> {
    try {
      const foodGroup = await this.baseFoodGroupService.update(+id, updateBaseFoodGroupDto);
      if (!foodGroup) {
        throw new NotFoundException(`Food group with ID ${id} not found`);
      }
      return foodGroup;
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new BadRequestException('Food group with this code already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a food group by ID' })
  @ApiParam({ name: 'id', description: 'Food group ID' })
  @ApiResponse({ status: 204, description: 'The food group has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Food group not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.baseFoodGroupService.remove(+id);
    if (!result) {
      throw new NotFoundException(`Food group with ID ${id} not found`);
    }
  }
}
