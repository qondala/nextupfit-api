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

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import { SwaggerType } from '@app/common/types';

import { BaseNutrientService } from '../service';

import {
  CreateBaseNutrientDto,
  UpdateBaseNutrientDto,
  PaginatedDetailsBaseNutrientDto,
  DetailsBaseNutrientDto
} from '../dto';

@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/nutrient")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseNutrientController {
  constructor(private readonly baseNutrientService: BaseNutrientService) {}

  @Post()
  @ApiOperation({
    operationId: 'createBaseNutrient',
    summary: 'Create a new nutrient'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The nutrient has been successfully created.',
    type: DetailsBaseNutrientDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Bad request. Code already exists or invalid input.' 
  })
  
  async create(@Body() createBaseNutrientDto: CreateBaseNutrientDto): Promise<DetailsBaseNutrientDto> {
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
  @ApiOperation({
    operationId: 'findAllBaseNutrients',
    summary: 'Get all nutrients with pagination'
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
    type: Number
  })
  @ApiQuery({
    name: 'userId',
    description: 'Filter by creator user ID',
    required: false,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Paginated list of nutrients',
    type: PaginatedDetailsBaseNutrientDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedDetailsBaseNutrientDto> {
    return await this.baseNutrientService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({
    operationId: 'searchBaseNutrients',
    summary: 'Search nutrients by query string with pagination'
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
    description: 'Paginated search results of nutrients',
    type: PaginatedDetailsBaseNutrientDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseNutrientDto> {
    return this.baseNutrientService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({
    operationId: 'getBaseNutrientByCode',
    summary: 'Get nutrient by code'
  })
  @ApiParam({
    name: 'code',
    description: 'Nutrient code',
    required: true,
    type: SwaggerType.STRING
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found nutrient',
    type: DetailsBaseNutrientDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nutrient not found'
  })
  async findByCode(@Param('code') code: string): Promise<DetailsBaseNutrientDto> {
    const nutrient = await this.baseNutrientService.findByCode(code);
    if (!nutrient) {
      throw new NotFoundException(`Nutrient with code '${code}' not found`);
    }
    return nutrient;
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getBaseNutrientById',
    summary: 'Get a specific nutrient by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Nutrient ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found nutrient',
    type: DetailsBaseNutrientDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nutrient not found'
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsBaseNutrientDto> {
    const nutrient = await this.baseNutrientService.findOne(id);
    if (!nutrient) {
      throw new NotFoundException(`Nutrient with ID ${id} not found`);
    }
    return nutrient;
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'updateBaseNutrient',
    summary: 'Update a nutrient by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Nutrient ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated nutrient',
    type: DetailsBaseNutrientDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nutrient not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Code already exists or invalid input.'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseNutrientDto: UpdateBaseNutrientDto,
  ): Promise<DetailsBaseNutrientDto> {
    try {
      const nutrient = await this.baseNutrientService.update(id, updateBaseNutrientDto);
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
  @ApiOperation({
    operationId: 'deleteBaseNutrient',
    summary: 'Delete a nutrient by ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Nutrient ID',
    required: true,
    type: SwaggerType.INTEGER
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The nutrient has been successfully deleted'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nutrient not found'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseNutrientService.remove(id);
    if (!result) {
      throw new NotFoundException(`Nutrient with ID ${id} not found`);
    }
  }
}