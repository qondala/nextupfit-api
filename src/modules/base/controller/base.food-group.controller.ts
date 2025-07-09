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
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';

import {
  ErrorResponseException,
  ErrorResponseExceptionType,
  SystemStatusCode
} from '@app/common/exceptions';
import { SwaggerType } from '@app/common/types';

import { JwtAuthGuard, RolesGuard } from '@app/common/guards';
import {
  DetailsBaseFoodGroupDto,
  PaginatedDetailsBaseFoodGroupDto
} from '../dto';
import { BaseFoodGroupService } from '../service';
import {
  CreateBaseFoodGroupDto,
  UpdateBaseFoodGroupDto
} from '../dto';


@ApiTags("Base module endpoints")
@ApiBearerAuth()
@Controller("base/food-group")
@UseGuards(JwtAuthGuard, RolesGuard)
export class BaseFoodGroupController {
  constructor(private readonly baseFoodGroupService: BaseFoodGroupService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new food group',
    description: 'Create a new food group',
    operationId: 'createFoodGroup'
  })
  @ApiCreatedResponse({ 
    description: 'The food group has been successfully created.',
    type: DetailsBaseFoodGroupDto 
  })
  @ApiNotFoundResponse({ 
    description: 'Food group with this code already exists or invalid input.',
    type: ErrorResponseException
  })
  async create(@Body() createBaseFoodGroupDto: CreateBaseFoodGroupDto): Promise<DetailsBaseFoodGroupDto> {
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
  @ApiOperation({
    summary: 'Get all food groups with pagination',
    description: 'Get all food groups with pagination',
    operationId: 'findAllFoodGroups'
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
  @ApiOkResponse({
    description: 'Paginated list of food groups',
    type: PaginatedDetailsBaseFoodGroupDto
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('userId') userId?: number
  ): Promise<PaginatedDetailsBaseFoodGroupDto> {
    return this.baseFoodGroupService.findAll({
      page: +page,
      limit: +limit
    }, userId ? +userId : undefined);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search food groups by query string with pagination',
    description: 'Search food groups by query string with pagination',
    operationId: 'searchFoodGroups'
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query string',
    required: true
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
  @ApiOkResponse({
    description: 'Paginated search results of food groups',
    type: PaginatedDetailsBaseFoodGroupDto
  })
  async search(
    @Query('q') query: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<PaginatedDetailsBaseFoodGroupDto> {
    return this.baseFoodGroupService.search(query, {
      page: +page,
      limit: +limit
    });
  }

  @Get('code/:code')
  @ApiOperation({
    summary: 'Get food group by code',
    description: 'Get food group by code',
    operationId: 'findFoodGroupByCode'
  })
  @ApiParam({
    name: 'code',
    description: 'Food group code',
    required: true,
    type: SwaggerType.STRING
  })
  @ApiOkResponse({
    description: 'The found food group',
    type: DetailsBaseFoodGroupDto
  })
  @ApiNotFoundResponse({
    description: 'Food group not found'
  })
  async findByCode(@Param('code') code: string): Promise<DetailsBaseFoodGroupDto> {
    const foodGroup = await this.baseFoodGroupService.findByCode(code);
    if (!foodGroup) {
      throw new ErrorResponseException(
        ErrorResponseExceptionType.HTTP,
        `Food group with code '${code}' not found`,
        HttpStatus.NOT_FOUND,
        SystemStatusCode.DATABASE
      );
    }
    return foodGroup;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific food group by ID',
    description: 'Get a specific food group by ID',
    operationId: 'findFoodGroupById'
  })
  @ApiParam({
    name: 'id',
    description: 'Food group ID',
    type: SwaggerType.INTEGER,
    required: true
  })
  @ApiOkResponse({
    description: 'The found food group',
    type: DetailsBaseFoodGroupDto
  })
  @ApiNotFoundResponse({
    description: 'Food group not found'
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DetailsBaseFoodGroupDto> {
    const foodGroup = await this.baseFoodGroupService.findOne(id);
    if (!foodGroup) {
      throw new NotFoundException(`Food group with ID ${id} not found`);
    }
    return foodGroup;
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a food group by ID',
    description: 'Update a food group by ID',
    operationId: 'updateFoodGroupById'
  })
  @ApiParam({
    name: 'id',
    description: 'Food group ID',
    type: SwaggerType.INTEGER,
    required: true
  })
  @ApiOkResponse({
    description: 'The updated food group',
    type: DetailsBaseFoodGroupDto
  })
  @ApiNotFoundResponse({
    description: 'Food group not found'
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Code already exists or invalid input.'
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBaseFoodGroupDto: UpdateBaseFoodGroupDto,
  ): Promise<DetailsBaseFoodGroupDto> {
    try {
      const foodGroup = await this.baseFoodGroupService.update(id, updateBaseFoodGroupDto);
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
  @ApiOperation({
    summary: 'Delete a food group by ID',
    description: 'Delete a food group by ID',
    operationId: 'deleteFoodGroupById'
  })
  @ApiParam({
    name: 'id',
    description: 'Food group ID',
    type: SwaggerType.INTEGER,
    required: true
  })
  @ApiNoContentResponse({
    description: 'The food group has been successfully deleted'
  })
  @ApiNotFoundResponse({
    description: 'Food group not found'
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.baseFoodGroupService.remove(id);
    if (!result) {
      throw new NotFoundException(`Food group with ID ${id} not found`);
    }
  }
}
